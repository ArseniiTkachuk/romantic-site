<template>
  <button
      v-if="hasMusic"
      class="music-btn"
      :class="{ playing: isPlaying }"
      @click="toggle"
      :aria-label="isPlaying ? 'Вимкнути музику' : 'Увімкнути музику'"
  >
    <span class="disc">🌙</span>
    <span class="waves" v-if="isPlaying">
      <span></span><span></span><span></span>
    </span>
  </button>
</template>

<script setup>
import { useBackgroundMusic } from '../composables/useBackgroundMusic.js'

const { isPlaying, toggle, hasMusic } = useBackgroundMusic()
</script>

<style scoped>
.music-btn {
  position: fixed;
  left: 24px;
  bottom: 24px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(8, 11, 38, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 150;
  box-shadow: var(--shadow-soft);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.music-btn:hover {
  transform: scale(1.08);
}

.disc {
  font-size: 20px;
  display: inline-block;
}

.music-btn.playing {
  border-color: var(--color-gold);
}

.waves {
  position: absolute;
  bottom: -4px;
  display: flex;
  gap: 2px;
  align-items: flex-end;
}

.waves span {
  width: 2px;
  background: var(--color-gold);
  border-radius: 2px;
  animation: wave 0.9s ease-in-out infinite;
}

.waves span:nth-child(1) { height: 6px; animation-delay: 0s; }
.waves span:nth-child(2) { height: 10px; animation-delay: 0.15s; }
.waves span:nth-child(3) { height: 6px; animation-delay: 0.3s; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.6); }
  50% { transform: scaleY(1.4); }
}

@media (max-width: 900px) {
  .music-btn {
    left: 16px;
    bottom: 90px;
    width: 46px;
    height: 46px;
  }
}
</style>