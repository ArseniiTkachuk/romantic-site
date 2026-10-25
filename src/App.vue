<template>
  <div class="romantic-container">
    <IntroGate />
    <ScrollNav />
    <MusicPlayer />
    <SkyBackground />

    <main class="content-wrapper">
      <PetalsOverlay v-if="special?.effect" :type="special.effect" />

      <HeroCounter :hero-message="special?.heroMessage || defaultHeroMessage" />
      <PhotoGallery />
      <LoveWords />
      <MemoryMoments />
      <LoveLetterModal :letter="activeLetter" />
      <SiteFooter />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { config } from './config.js'
import { useSpecialDay } from './composables/useSpecialDay.js'

import SkyBackground from './components/SkyBackground.vue'
import PetalsOverlay from './components/PetalsOverlay.vue'
import HeroCounter from './components/HeroCounter.vue'
import LoveWords from './components/LoveWords.vue'
import LoveLetterModal from './components/LoveLetterModal.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import MemoryMoments from './components/MemoryMoments.vue'
import SiteFooter from './components/SiteFooter.vue'
import ScrollNav from './components/ScrollNav.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import IntroGate from './components/IntroGate.vue'

const { special } = useSpecialDay()

const defaultHeroMessage = 'Скільки ми вже разом'

const activeLetter = computed(() => {
  return special.value?.letter || config.defaultLetter
})
</script>

<style scoped>
.romantic-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #080b26 0%, #1d1450 100%);
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>