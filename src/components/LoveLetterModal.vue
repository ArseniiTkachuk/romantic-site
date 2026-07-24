<template>
  <section class="section letter-section">
    <p class="eyebrow">для тебе</p>
    <h2>Великий лист</h2>
    <p class="hint">натисни на конверт</p>

    <!-- Конверт -->
    <button
        class="envelope"
        :class="{ 'is-opening': isOpening }"
        @click="openLetter"
        aria-label="Відкрити лист"
    >
      <div class="envelope-body">
        <div class="flap"></div>
        <div class="seal">🌹</div>
      </div>
    </button>

    <!-- Модальне вікно з папером, що виїжджає та згортається -->
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

const props = defineProps({
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

  // Зачекаємо поки відкриється клапан конверта, потім покажемо лист
  setTimeout(() => {
    isOpen.value = true
  }, 400)
}

const closeLetter = () => {
  if (isClosing.value) return
  isClosing.value = true // Запускаємо анімацію зменшення листа

  // Чекаємо завершення анімації зменшення, потім повністю ховаємо все
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

.hint {
  color: var(--color-ink-soft);
  font-style: italic;
  margin-bottom: 40px;
}

.envelope {
  background: none;
  border: none;
  padding: 0;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  perspective: 1000px;
}

.envelope-body {
  position: relative;
  width: 220px;
  height: 150px;
  background: #ffd1d1;
  border: 1px solid var(--color-rose);
  border-radius: 6px;
  box-shadow: var(--shadow-soft);
  transition: transform 0.25s ease;
  z-index: 2;
}

.envelope:hover .envelope-body {
  transform: translateY(-6px) scale(1.03);
}

/* Клапан конверта */
.flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 110px solid transparent;
  border-right: 110px solid transparent;
  border-top: 90px solid var(--color-rose);
  opacity: 0.55;
  transform-origin: top;
  transition: transform 0.4s ease, opacity 0.3s ease;
  z-index: 3;
}

/* Печатка */
.seal {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 26px;
  filter: drop-shadow(0 4px 8px rgba(122,39,57,0.3));
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 4;
}

/* Анімація відкриття конверта при кліку */
.envelope.is-opening .flap {
  transform: rotateX(180deg);
  opacity: 0;
}

.envelope.is-opening .seal {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}

.envelope.is-opening .envelope-body {
  transform: scale(0.95);
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* Бекдроп модалки */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(59, 31, 43, 0.85);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  backdrop-filter: blur(4px);
}

/* Лист, що виїжджає */
.letter-paper {
  position: relative;
  background: var(--color-white);
  max-width: 560px;
  width: 100%;
  max-height: 82vh;
  overflow-y: auto;
  padding: 48px 40px;
  border-radius: 6px;
  box-shadow: 0 40px 100px rgb(0 0 0 / 0.46);
  text-align: left;
  animation: slideOutFromEnvelope 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Анімація закриття (зменшення листа) */
.letter-paper.is-closing {
  animation: slideIntoEnvelope 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideOutFromEnvelope {
  0% {
    opacity: 0;
    transform: translateY(120px) scale(0.7);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideIntoEnvelope {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(120px) scale(0.7);
  }
}

.letter-paper h3 {
  margin-bottom: 20px;
  font-style: italic;
}

.letter-title {
  color: #630008;
}

.letter-body {
  white-space: pre-line;
  color: #b60b1a;
  line-height: 1.8;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-ink-soft);
  cursor: pointer;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.1);
}
</style>