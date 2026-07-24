<template>
    <div class="romantic-container">
      <!-- Анімований фон з пелюстками троянд -->
      <div class="rose-petals-background">
        <div
            v-for="petal in petals"
            :key="petal.id"
            class="petal"
            :style="{
          left: `${petal.left}%`,
          width: `${petal.size}px`,
          height: `${petal.size * 1.3}px`,
          animationDuration: `${petal.duration}s`,
          animationDelay: `${petal.delay}s`,
          opacity: petal.opacity,
          transform: `rotate(${petal.rotation}deg)`
        }"
        ></div>
      </div>

      <!-- Контент сайту (тут будуть твої блоки поверх фону) -->
      <main class="content-wrapper">

        <PetalsOverlay v-if="special?.effect" :type="special.effect" />

        <HeroCounter :hero-message="special?.heroMessage || defaultHeroMessage" />
        <PhotoGallery />
        <LoveWords />
        <MemoryMoments />
        <LoveLetterModal :letter="activeLetter" />
        <SiteFooter/>
      </main>
    </div>
</template>

<script setup>
import { computed, ref, onMounted} from 'vue'
import { config } from './config.js'
import { useSpecialDay } from './composables/useSpecialDay.js'

import PetalsOverlay from './components/PetalsOverlay.vue'
import HeroCounter from './components/HeroCounter.vue'
import LoveWords from './components/LoveWords.vue'
import LoveLetterModal from "./components/LoveLetterModal.vue";
import PhotoGallery from "./components/PhotoGallery.vue";
import MemoryMoments from "./components/MemoryMoments.vue";
import SiteFooter from "./components/SiteFooter.vue";

const { special } = useSpecialDay()

const defaultHeroMessage = 'Скільки ми вже разом'

const activeLetter = computed(() => {
  return special.value?.letter || config.defaultLetter
})


// Створюємо масив пелюсток з випадковими параметрами для унікальної анімації
const petals = ref([])

onMounted(() => {
  const petalsCount = 35 // Кількість пелюсток на екрані
  const tempPetals = []

  for (let i = 0; i < petalsCount; i++) {
    const duration = Math.random() * 10 + 35 // Тривалість від 35 до 45 секунд

    tempPetals.push({
      id: i,
      left: Math.random() * 100, // Позиція по горизонталі (0-100%)
      size: Math.random() * 15 + 10, // Розмір від 10px до 25px
      duration: duration,
      // ВІД'ЄМНА затримка від 0 до -duration. Це одразу «розміщує» їх на різних етапах падіння по висоті екрана!
      delay: -(Math.random() * duration),
      opacity: Math.random() * 0.7 + 0.3,
      rotation: Math.random() * 360
    })
  }
  petals.value = tempPetals
})
</script>

<style scoped>
   /* Глобальні скидання */
 * {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
 }

body {
  background-color: #2b0003; /* Глибокий криваво-темний відтінок на випадок завантаження */
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

.romantic-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #370303 0%, #190101 100%); /* Криваво-червоний градієнт */
  overflow: hidden;
}

/* --- АНІМАЦІЯ ПЕЛЮСТОК --- */
.rose-petals-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Щоб пелюстки не заважали клікати по сайту */
  z-index: 1; /* Фон позаду контенту, але поверх градієнта */
  overflow: hidden;
}

   .petal {
     position: absolute;
     top: -10%;
     /* 1. Вдосконалений градієнт: додаємо більш світлий, рожевий відблиск для об'єму */
     background: radial-gradient(circle at 30% 30%, #ff8080 0%, #d40015 40%, #5a0000 100%);
     /* 2. Складна асиметрична форма для більш природного вигляду */
     border-radius: 50% 50% 20% 50% / 50% 50% 20% 50%;
     /* 3. Легка тінь для глибини, щоб вони не виглядали як плоскі шматочки паперу */
     box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
     animation: fall linear infinite;
     /* Додаємо трохи 3D-перспективи для обертання */
     transform-style: preserve-3d;
   }

@keyframes fall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
  }
  50% {
    transform: translateY(50vh) translateX(50px) rotate(180deg);
  }
  100% {
    transform: translateY(110vh) translateX(-30px) rotate(360deg);
  }
}

/* --- СТИЛІ ДЛЯ КОНТЕНТУ --- */
.content-wrapper {
  position: relative;
  z-index: 2; /* Контент завжди поверх пелюсток */
  display: flex;
  flex-direction: column;
  width: 100%;
}

.demo-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ffccd5;
  font-family: Georgia, serif;
  text-shadow: 0 0 15px rgba(255, 0, 50, 0.5);
}

.subtitle {
  font-size: 1.2rem;
  color: #ff8fa3;
}
</style>