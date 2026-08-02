<template>
  <footer class="footer" id="footer">
    <div class="rose-row">🌹 ❀ 🌹</div>
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
  padding: 100px 24px 80px;
  background: rgb(87 1 19 / 0.24);
  color: var(--color-white);
}

.rose-row {
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 24px;
}

.main-line {
  color: var(--color-white);
  font-size: clamp(26px, 5vw, 44px);
  font-style: italic;
  max-width: 800px;
  margin: 0 auto 28px;
  line-height: 1.35;
}

.sub-line {
  font-size: 16px;
  opacity: 0.85;
  margin: 6px 0;
}

.signature {
  margin-top: 30px;
  font-family: var(--font-utility);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.6;
}
</style>