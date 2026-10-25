<template>
  <canvas ref="cv" class="sky" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cv = ref(null)
let raf = 0
let cx = null
let W = 0
let H = 0
let dpr = 1
let stars = []
let flies = []
let shots = []
const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function size() {
  dpr = Math.min(2, window.devicePixelRatio || 1)
  W = window.innerWidth
  H = window.innerHeight
  cv.value.width = W * dpr
  cv.value.height = H * dpr
  cx.setTransform(dpr, 0, 0, dpr, 0, 0)

  stars = Array.from({ length: Math.round((W * H) / 7000) }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.3 + 0.3,
    ph: Math.random() * 6.28,
    sp: Math.random() * 1.5 + 0.4,
  }))

  flies = Array.from({ length: 16 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    ph: Math.random() * 6.28,
  }))
}

function shoot() {
  shots.push({
    x: Math.random() * W * 0.8 + W * 0.2,
    y: Math.random() * H * 0.35,
    vx: -7 - Math.random() * 4,
    vy: 3 + Math.random() * 2,
    life: 1,
  })
}

function frame(ms) {
  const t = ms / 1000
  cx.clearRect(0, 0, W, H)

  cx.fillStyle = '#fff1d6'
  for (const s of stars) {
    cx.globalAlpha = still ? 0.6 : 0.25 + 0.75 * (Math.sin(t * s.sp + s.ph) * 0.5 + 0.5)
    cx.beginPath()
    cx.arc(s.x, s.y, s.r, 0, 6.283)
    cx.fill()
  }

  for (const f of flies) {
    if (!still) {
      f.x += f.vx + Math.sin(t + f.ph) * 0.15
      f.y += f.vy + Math.cos(t * 0.8 + f.ph) * 0.15
      if (f.x < 0) f.x = W
      if (f.x > W) f.x = 0
      if (f.y < 0) f.y = H
      if (f.y > H) f.y = 0
    }
    const g = cx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 12)
    g.addColorStop(0, '#ffc57a')
    g.addColorStop(1, 'transparent')
    cx.globalAlpha = 0.3 + 0.7 * (Math.sin(t * 1.3 + f.ph) * 0.5 + 0.5)
    cx.fillStyle = g
    cx.fillRect(f.x - 12, f.y - 12, 24, 24)
  }

  shots = shots.filter((s) => {
    s.x += s.vx
    s.y += s.vy
    s.life -= 0.012
    if (s.life <= 0) return false
    const g = cx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9)
    g.addColorStop(0, '#fff1d6')
    g.addColorStop(1, 'transparent')
    cx.globalAlpha = s.life
    cx.strokeStyle = g
    cx.lineWidth = 1.6
    cx.beginPath()
    cx.moveTo(s.x, s.y)
    cx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9)
    cx.stroke()
    return true
  })

  if (!still) {
    if (Math.random() < 0.002) shoot()
    raf = requestAnimationFrame(frame)
  }
}

onMounted(() => {
  cx = cv.value.getContext('2d')
  size()
  window.addEventListener('resize', size)
  raf = requestAnimationFrame(frame)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', size)
})
</script>

<style scoped>
.sky {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
</style>