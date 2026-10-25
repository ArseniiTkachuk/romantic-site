<template>
  <section class="hero" id="hero">
    <h1 class="names">Арсен<i>&amp;</i>{{ config.partner.nominative }}</h1>

    <h2 class="hero-title">{{ heroMessage }}</h2>

    <div class="dials">
      <div v-if="time.years > 0" class="dial" :style="{ '--p': 100 }">
        <div><b>{{ time.years }}</b><span>{{ time.years === 1 ? 'рік' : 'роки' }}</span></div>
      </div>
      <div class="dial" :style="{ '--p': (time.months / 12) * 100 }">
        <div><b>{{ time.months }}</b><span>міс</span></div>
      </div>
      <div class="dial" :style="{ '--p': (time.days / 31) * 100 }">
        <div><b>{{ time.days }}</b><span>дн</span></div>
      </div>
      <div class="dial" :style="{ '--p': (time.hours / 24) * 100 }">
        <div><b>{{ pad(time.hours) }}</b><span>год</span></div>
      </div>
      <div class="dial" :style="{ '--p': (time.minutes / 60) * 100 }">
        <div><b>{{ pad(time.minutes) }}</b><span>хв</span></div>
      </div>
      <div class="dial" :style="{ '--p': (time.seconds / 60) * 100 }">
        <div><b>{{ pad(time.seconds) }}</b><span>сек</span></div>
      </div>
    </div>

    <p class="hero-sub">{{ time.totalDays.toLocaleString('uk-UA') }} днів — і кожен із них був кращим завдяки тобі</p>
  </section>
</template>

<script setup>
import { useCountdown } from '../composables/useCountdown.js'
import { config } from '../config.js'

defineProps({
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
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 70px clamp(20px, 5vw, 48px) 50px;
}

.names {
  font-family: var(--font-script);
  font-size: clamp(48px, 11vw, 130px);
  line-height: 1.05;
  text-shadow: 0 0 40px rgba(255, 197, 122, 0.35);
  overflow-wrap: anywhere;
}

.names i {
  font-style: normal;
  color: var(--color-gold);
  font-size: 0.55em;
  padding: 0 0.2em;
}

.hero-title {
  font-style: italic;
  font-weight: 300;
  font-size: clamp(22px, 3.4vw, 34px);
  margin: 26px 0 38px;
  color: var(--color-ink-soft);
  max-width: 26ch;
}

.dials {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(12px, 2.4vw, 26px);
}

.dial {
  --p: 0;
  width: clamp(78px, 13vw, 118px);
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  display: grid;
  place-items: center;
  text-align: center;
  background: conic-gradient(var(--color-gold) calc(var(--p) * 1%), rgba(255, 255, 255, 0.12) 0);
  filter: drop-shadow(0 0 10px rgba(255, 197, 122, 0.25));
}

.dial::before {
  content: '';
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: #0c1033;
}

.dial div {
  position: relative;
  line-height: 1.1;
}

.dial b {
  display: block;
  font-weight: 400;
  font-size: clamp(24px, 4.4vw, 38px);
  font-variant-numeric: tabular-nums;
}

.dial span {
  font-size: clamp(11px, 1.6vw, 14px);
  color: var(--color-ink-soft);
}

.hero-sub {
  margin-top: 30px;
  font-style: italic;
  color: var(--color-ink-soft);
  max-width: 46ch;
}
</style>