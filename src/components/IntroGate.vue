<template>
  <Transition name="fade">
    <div v-if="visible" class="intro-gate">
      <div class="intro-decor">🌹</div>
      <h1 class="intro-title">Наша історія</h1>
      <p class="intro-sub">Тут все, що я хочу тобі сказати</p>

      <button class="intro-btn" @click="enter">
        Почати <span class="intro-btn-icon">➔</span>
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
  // Клік користувача — саме той дозволений момент, коли браузер
  // дозволяє запустити звук без блокування автоплею
  play()
  visible.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  // Поки показано вступний екран — забороняємо скрол сторінки під ним
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
  background: linear-gradient(135deg, #370303 0%, #190101 100%);
}

.intro-decor {
  font-size: 48px;
  margin-bottom: 20px;
  filter: drop-shadow(0 8px 16px rgba(122, 39, 57, 0.3));
}

.intro-title {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(28px, 6vw, 48px);
  color: var(--color-white, #fff);
  margin-bottom: 12px;
}

.intro-sub {
  color: var(--color-blush, #ffccd5);
  margin-bottom: 40px;
  font-style: italic;
}

.intro-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--color-rose-deep, #b60b1a);
  color: var(--color-white, #fff);
  border: none;
  padding: 16px 36px;
  border-radius: 999px;
  font-family: var(--font-utility);
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(182, 11, 26, 0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.intro-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 16px 36px rgba(182, 11, 26, 0.5);
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
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>