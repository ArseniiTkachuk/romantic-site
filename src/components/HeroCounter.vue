<template>
  <section class="hero" id="hero">
    <div class="hero-decor">🌹</div>

    <h1 class="hero-title">{{ heroMessage }}</h1>

    <p class="eyebrow">разом уже</p>

    <div class="counter">
      <div class="unit">
        <span class="num">{{ time.years }}</span>
        <span class="label">роки</span>
      </div>
      <div class="unit">
        <span class="num">{{ time.months }}</span>
        <span class="label">місяці</span>
      </div>
      <div class="unit">
        <span class="num">{{ time.days }}</span>
        <span class="label">дні</span>
      </div>
      <div class="unit">
        <span class="num">{{ pad(time.hours) }}</span>
        <span class="label">години</span>
      </div>
      <div class="unit">
        <span class="num">{{ pad(time.minutes) }}</span>
        <span class="label">хвилини</span>
      </div>
      <div class="unit">
        <span class="num">{{ pad(time.seconds) }}</span>
        <span class="label">секунди</span>
      </div>
    </div>

    <p class="hero-sub">{{ time.totalDays.toLocaleString('uk-UA') }} днів — і кожен з них був кращим завдяки тобі</p>

  </section>
</template>

<script setup>
import { useCountdown } from '../composables/useCountdown.js'
import { config } from '../config.js'

const props = defineProps({
  heroMessage: {
    type: String,
    default: null,
  },
})

const { time } = useCountdown(config.relationshipStart)

function pad(n) {
  return String(n).padStart(2, '0')
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  position: relative;
}

.hero-decor {
  font-size: 40px;
  margin-bottom: 18px;
  filter: drop-shadow(0 8px 16px rgba(122, 39, 57, 0.2));
}

.hero-title {
  font-size: clamp(28px, 5vw, 52px);
  font-style: italic;
  max-width: 780px;
  margin: 14px 0 40px;
  line-height: 1.25;
}

.counter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  margin-bottom: 28px;
}

.unit {
  background: var(--color-white);
  border: 1px solid var(--color-blush);
  border-radius: 16px;
  padding: 18px 20px;
  min-width: 84px;
  box-shadow: var(--shadow-soft);
}

.num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: var(--color-rose-deep);
  line-height: 1;
}

.label {
  display: block;
  margin-top: 8px;
  font-family: var(--font-utility);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #b60b1a;
}

.hero-sub {
  font-style: italic;
  color: var(--color-ink-soft);
  max-width: 480px;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

@media (max-width: 640px) {
  .counter { gap: 10px; }
  .unit { min-width: 70px; padding: 14px 12px; }
}
</style>