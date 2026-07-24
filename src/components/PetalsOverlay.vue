<template>
  <div class="overlay" aria-hidden="true">
    <span
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="p.style"
    >{{ symbol }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'petals', // 'petals' | 'hearts' | 'confetti'
  },
  count: {
    type: Number,
    default: 26,
  },
})

const symbol = computed(() => {
  if (props.type === 'hearts') return '♥'
  if (props.type === 'confetti') return '✦'
  return '❀'
})

const particles = Array.from({ length: props.count }, (_, id) => {
  const left = Math.random() * 100
  const duration = 9 + Math.random() * 9
  const delay = Math.random() * -14
  const size = 12 + Math.random() * 16
  const drift = (Math.random() * 2 - 1) * 80
  const spin = Math.random() * 360

  return {
    id,
    style: {
      left: left + 'vw',
      fontSize: size + 'px',
      animationDuration: duration + 's',
      animationDelay: delay + 's',
      '--drift': drift + 'px',
      '--spin': spin + 'deg',
    },
  }
})
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 40;
  overflow: hidden;
}

.particle {
  position: absolute;
  top: -8vh;
  color: var(--color-rose);
  opacity: 0.85;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

@keyframes fall {
  0% {
    transform: translate(0, -8vh) rotate(0deg);
    opacity: 0;
  }
  8% { opacity: 0.85; }
  92% { opacity: 0.85; }
  100% {
    transform: translate(var(--drift), 108vh) rotate(var(--spin));
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .overlay { display: none; }
}
</style>