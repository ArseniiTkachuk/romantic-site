<template>
  <section class="section words-section" id="words">
    <div class="glass">
      <p class="eyebrow">слова на сьогодні</p>
      <h2 class="words-title">{{ todayWord }}</h2>
      <p class="words-note">кожен день тут з’являються нові слова — заглядай частіше</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { config } from '../config.js'

// Одна й та сама фраза тримається цілий день і змінюється по колу
const todayWord = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const words = config.loveWords.length ? config.loveWords : ['Я тебе люблю.']
  return words[dayOfYear % words.length]
})
</script>

<style scoped>
.words-section {
  max-width: 1000px;
}

.glass {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  padding: clamp(30px, 6vw, 70px);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.words-title {
  font-family: var(--font-display);
  color: var(--color-white);
  font-size: clamp(26px, 4.6vw, 46px);
  font-style: italic;
  font-weight: 300;
  line-height: 1.35;
  margin: 12px 0 26px;
}

.words-note {
  font-size: 15px;
  color: var(--color-ink-soft);
  margin: 0;
}
</style>