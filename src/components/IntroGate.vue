<template>
  <Transition name="fade">
    <div v-if="visible" class="intro-gate">
      <div class="intro-moon"></div>
      <h1 class="intro-title">Наша історія</h1>
      <p class="intro-sub">Тут усе, що я хочу тобі сказати</p>

      <button class="intro-btn" @click="enter">
        Увійти <span class="intro-btn-icon">➔</span>
      </button>

      <p class="intro-hint" v-if="hasMusic">натисни — і одразу зазвучить музика</p>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBackgroundMusic } from '../composables/useBackgroundMusic.js'

const visible = ref(true)
const { play, hasMusic } = useBackgroundMusic()

function enter() {
  // Клік користувача дозволяє браузеру запустити звук
  play()
  visible.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
</script>

<style scoped>
.intro-gate {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: radial-gradient(ellipse at 50% 35%, #1d1450, #080b26 70%);
}

.intro-moon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 34px;
  background: radial-gradient(circle at 35% 35%, #fffaf0, #f4e0b4 55%, #d9b97c);
  box-shadow: 0 0 60px 18px rgba(255, 214, 150, 0.35);
}

.intro-title {
  font-family: var(--font-script);
  font-size: clamp(46px, 10vw, 88px);
  line-height: 1.1;
  color: var(--color-white);
  margin-bottom: 10px;
}

.intro-sub {
  color: var(--color-ink-soft);
  margin: 0 0 36px;
  font-style: italic;
}

.intro-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.07);
  color: var(--color-white);
  border: 1px solid var(--color-gold);
  padding: 14px 40px;
  border-radius: 999px;
  font-family: inherit;
  font-size: 17px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.intro-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 28px rgba(255, 197, 122, 0.5);
}

.intro-btn-icon {
  display: inline-block;
  transition: transform 0.25s ease;
}

.intro-btn:hover .intro-btn-icon {
  transform: translateX(4px);
}

.intro-hint {
  margin-top: 24px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>