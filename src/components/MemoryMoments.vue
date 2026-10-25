<template>
  <section class="section" id="moments">
    <p class="eyebrow">теплі спогади</p>
    <h2>Моменти, які хочеться пам’ятати</h2>

    <div class="list">
      <article
          v-for="(m, i) in config.moments"
          :key="i"
          class="moment"
          :class="{ reverse: i % 2 === 1 }"
      >
        <div class="photo">
          <img :src="m.src" :alt="m.title" loading="lazy" />
        </div>
        <div class="text">
          <h3>{{ m.title }}</h3>
          <p>{{ m.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { config } from '../config.js'
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 72px;
  margin-top: 48px;
}

.moment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.moment.reverse {
  direction: rtl;
}
.moment.reverse .text,
.moment.reverse .photo {
  direction: ltr;
}

.photo img {
  display: block;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 999px 999px 14px 14px;
  border: 1px solid var(--color-blush);
  box-shadow: var(--shadow-soft);
  background: rgba(255, 255, 255, 0.08);
}

.text h3 {
  font-style: italic;
  color: var(--color-gold);
  font-size: clamp(22px, 3.2vw, 32px);
  margin-bottom: 14px;
}

.text p {
  color: var(--color-ink-soft);
  line-height: 1.75;
  margin: 0;
}

@media (max-width: 720px) {
  .moment, .moment.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 24px;
  }
}
</style>