<template>
  <section class="section words-section">
    <p class="eyebrow">слова на сьогодні</p>
    <h2 class="words-title">{{ todayWord }}</h2>
    <div class="divider">❀</div>
    <p class="words-note">кожен день тут з'являються нові слова — заглядай частіше</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { config } from '../config.js'

// детермінований вибір фрази за днем року — та сама фраза тримається
// цілий день і природньо змінюється по колу день у день
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
  text-align: center;
  max-width: 720px;
}

.words-title {
  font-size: clamp(24px, 4vw, 38px);
  font-style: italic;
  line-height: 1.4;
  margin-top: 16px;
}

.divider {
  margin: 32px auto;
  color: var(--color-gold);
  font-size: 20px;
}

.words-note {
  font-family: var(--font-utility);
  font-size: 13px;
  letter-spacing: 0.05em;
  color: var(--color-ink-soft);
}
</style>