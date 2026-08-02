<template>
  <section class="section" id="moments">
    <p class="eyebrow">теплі спогади</p>
    <h2>Моменти, які хочеться пам'ятати</h2>

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
  gap: 64px;
  margin-top: 48px;
}

.moment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
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
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: var(--shadow-soft);
  background: var(--color-blush);
}

.text h3 {
  font-size: clamp(20px, 3vw, 28px);
  margin-bottom: 14px;
}

.text p {
  color: var(--color-ink-soft);
  line-height: 1.7;
}

@media (max-width: 720px) {
  .moment, .moment.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>