<template>
  <footer class="footer" id="footer">
    <div class="stars-row">✦ ❀ ✦</div>
    <h2 class="main-line">{{ config.footer.mainLine }}</h2>
    <p v-for="(line, i) in config.footer.subLines" :key="i" class="sub-line">
      {{ line }}
    </p>
    <p class="signature">— назавжди твій Арсен</p>
  </footer>
</template>

<script setup>
import { config } from '../config.js'
</script>

<style scoped>
.footer {
  text-align: center;
  padding: clamp(80px, 12vw, 140px) 24px 120px;
  background: linear-gradient(180deg, transparent, rgba(255, 197, 122, 0.06));
  color: var(--color-white);
}

.stars-row {
  font-size: 20px;
  color: var(--color-gold);
  opacity: 0.8;
  margin-bottom: 24px;
}

.main-line {
  font-family: var(--font-script);
  color: var(--color-white);
  font-size: clamp(36px, 7vw, 74px);
  line-height: 1.15;
  max-width: 16ch;
  margin: 0 auto 30px;
  text-shadow: 0 0 36px rgba(255, 197, 122, 0.35);
}

.sub-line {
  font-style: italic;
  color: var(--color-ink-soft);
  margin: 6px 0;
}

.signature {
  margin-top: 34px;
  font-family: var(--font-script);
  font-size: 30px;
  color: var(--color-gold);
}
</style>