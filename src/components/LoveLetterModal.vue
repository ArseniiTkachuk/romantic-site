<template>
  <section class="section letter-section" id="letter">
    <p class="eyebrow">для тебе</p>
    <h2>Великий лист</h2>

    <!-- Світний ліхтарик замість конверта -->
    <button
        class="envelope"
        :class="{ 'is-opening': isOpening }"
        @click="openLetter"
        aria-label="Відкрити лист"
    >
      <div class="envelope-body">
        <div class="seal">✦</div>
      </div>
      <span class="hint">натисни на ліхтарик</span>
    </button>

    <Teleport to="body">
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeLetter">
        <div class="letter-paper" :class="{ 'is-closing': isClosing }">
          <button class="close-btn" @click="closeLetter" aria-label="Закрити лист">✕</button>
          <h3 class="letter-title">{{ letter.title }}</h3>
          <p class="letter-body">{{ letter.body }}</p>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  letter: {
    type: Object,
    required: true,
  },
})

const isOpening = ref(false)
const isOpen = ref(false)
const isClosing = ref(false)

const openLetter = () => {
  if (isOpening.value || isOpen.value) return
  isOpening.value = true
  setTimeout(() => {
    isOpen.value = true
  }, 400)
}

const closeLetter = () => {
  if (isClosing.value) return
  isClosing.value = true
  setTimeout(() => {
    isOpen.value = false
    isClosing.value = false
    isOpening.value = false
  }, 400)
}
</script>

<style scoped>
.letter-section {
  text-align: center;
}

.envelope {
  background: none;
  border: none;
  padding: 0;
  margin: 0 auto;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  color: var(--color-white);
  font-family: inherit;
}

.envelope-body {
  position: relative;
  width: 92px;
  height: 118px;
  border-radius: 44% 44% 38% 38% / 32% 32% 22% 22%;
  background: radial-gradient(ellipse at 50% 60%, #fff3c4, #ffb25c 55%, #c9561e);
  box-shadow: 0 0 60px 16px rgba(255, 170, 80, 0.5);
  animation: bob 5s ease-in-out infinite;
  transition: box-shadow 0.3s ease;
}

.envelope:hover .envelope-body {
  box-shadow: 0 0 90px 28px rgba(255, 170, 80, 0.65);
}

.seal {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  color: #7a3410;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.hint {
  color: var(--color-ink-soft);
  font-style: italic;
}

.envelope.is-opening .envelope-body {
  transform: scale(1.1);
  box-shadow: 0 0 120px 40px rgba(255, 170, 80, 0.8);
}

.envelope.is-opening .seal {
  opacity: 0;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 6, 24, 0.8);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(4px);
}

.letter-paper {
  position: relative;
  background: linear-gradient(180deg, #1d1450, #080b26);
  border: 1px solid var(--color-gold);
  color: var(--color-white);
  max-width: 560px;
  width: 100%;
  max-height: 82vh;
  overflow-y: auto;
  padding: 48px 40px;
  border-radius: 20px;
  box-shadow: 0 0 90px rgba(255, 170, 80, 0.35);
  text-align: left;
  animation: slideOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.letter-paper.is-closing {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideOut {
  0% { opacity: 0; transform: translateY(100px) scale(0.85); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slideIn {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(100px) scale(0.85); }
}

.letter-title {
  font-family: var(--font-script);
  color: var(--color-gold);
  font-size: 38px;
  margin-bottom: 18px;
}

.letter-body {
  white-space: pre-line;
  color: var(--color-white);
  line-height: 1.8;
  margin: 0;
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 22px;
  color: var(--color-ink-soft);
  cursor: pointer;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.1);
}

@media (prefers-reduced-motion: reduce) {
  .envelope-body { animation: none; }
}
</style>