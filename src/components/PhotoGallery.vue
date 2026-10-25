<template>
  <section class="section" id="gallery">
    <p class="eyebrow">спільні моменти</p>
    <h2>Наша галерея</h2>

    <div class="scatter">
      <div
          v-for="(item, i) in config.gallery"
          :key="i"
          class="item"
          :class="'shape-' + layout(i).shape"
          :style="{
            '--w': layout(i).w,
            '--ml': layout(i).ml,
            '--mt': layout(i).mt,
            '--rot': layout(i).rot + 'deg',
            '--z': layout(i).z,
            '--dur': 7 + (i % 4) * 1.3 + 's',
            '--delay': -(i * 1.7) + 's',
          }"
      >
        <button class="frame" @click="open(i)" :aria-label="'Відкрити елемент ' + (i + 1)">
          <video
              v-if="item.type === 'video'"
              :src="item.src"
              autoplay
              muted
              loop
              playsinline
              class="media-element"
          ></video>

          <img
              v-else
              :src="item.src"
              :alt="item.caption || 'спільне фото'"
              loading="lazy"
              class="media-element"
          />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="activeIndex !== null" class="lightbox" @click.self="close">
        <button class="close-btn" @click="close" aria-label="Закрити">✕</button>
        <button class="nav prev" @click="prev" aria-label="Попередній елемент">‹</button>

        <figure>
          <video
              v-if="config.gallery[activeIndex].type === 'video'"
              :src="config.gallery[activeIndex].src"
              autoplay
              muted
              loop
              playsinline
              controls
              class="lightbox-media"
          ></video>

          <img
              v-else
              :src="config.gallery[activeIndex].src"
              :alt="config.gallery[activeIndex].caption"
              class="lightbox-media"
          />

          <figcaption v-if="config.gallery[activeIndex].caption">
            {{ config.gallery[activeIndex].caption }}
          </figcaption>
        </figure>

        <button class="nav next" @click="next" aria-label="Наступний елемент">›</button>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { config } from '../config.js'

const activeIndex = ref(null)

// Розкладка: розмір, форма, нахил, відступи. Якщо фото більше, ніж записів тут,
// розкладка просто повторюється по колу. Можна міняти числа як завгодно.
const patterns = [
  { shape: 'arch',  w: '36%', rot: -3, ml: '2%',  mt: '0px',   z: 2 },
  { shape: 'circle', w: '25%', rot: 4,  ml: '-3%', mt: '70px',  z: 3 },
  { shape: 'wide',  w: '31%', rot: -2, ml: '4%',  mt: '20px',  z: 1 },
  { shape: 'oval',  w: '26%', rot: 5,  ml: '8%',  mt: '-30px', z: 3 },
  { shape: 'arch',  w: '34%', rot: -4, ml: '-2%', mt: '40px',  z: 2 },
  { shape: 'blob',  w: '24%', rot: 3,  ml: '6%',  mt: '0px',   z: 1 },
  { shape: 'wide',  w: '32%', rot: -5, ml: '-4%', mt: '50px',  z: 2 },
]

function layout(i) {
  return patterns[i % patterns.length]
}

function open(i) { activeIndex.value = i }
function close() { activeIndex.value = null }
function next() { activeIndex.value = (activeIndex.value + 1) % config.gallery.length }
function prev() { activeIndex.value = (activeIndex.value - 1 + config.gallery.length) % config.gallery.length }
</script>

<style scoped>
.scatter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 0 60px;
  margin-top: 30px;
}

.item {
  width: var(--w);
  margin-left: var(--ml);
  margin-top: var(--mt);
  margin-bottom: 20px;
  transform: rotate(var(--rot));
  z-index: var(--z);
  position: relative;
}

.frame {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--color-blush);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  position: relative;
  /* повільне "плавання" через окрему властивість translate, щоб не конфліктувати з hover */
  animation: drift var(--dur) ease-in-out var(--delay) infinite;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.item:hover {
  z-index: 10;
}

.item:hover .frame {
  transform: rotate(calc(var(--rot) * -1)) scale(1.06);
  box-shadow: 0 0 60px rgba(255, 197, 122, 0.35);
}

.media-element {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---- Форми ---- */
.shape-arch .frame  { aspect-ratio: 3 / 4.3; border-radius: 999px 999px 16px 16px; }
.shape-circle .frame { aspect-ratio: 1; border-radius: 50%; }
.shape-oval .frame  { aspect-ratio: 4 / 5.2; border-radius: 50%; }
.shape-wide .frame  { aspect-ratio: 5 / 4; border-radius: 30px; }
.shape-blob .frame  { aspect-ratio: 1 / 1.15; border-radius: 62% 38% 55% 45% / 48% 58% 42% 52%; }

@keyframes drift {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -14px; }
}

@media (max-width: 640px) {
  .scatter {
    padding: 10px 0 40px;
  }
  .item {
    width: min(calc(var(--w) * 1.9), 78%);
    margin-left: calc(var(--ml) * 1.5);
    margin-top: calc(var(--mt) * 0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .frame { animation: none; }
}

/* ---- Лайтбокс ---- */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5, 6, 24, 0.92);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.lightbox figure {
  margin: 0;
  max-width: min(720px, 90vw);
  text-align: center;
}

.lightbox-media {
  max-width: 100%;
  max-height: 74vh;
  border-radius: 12px;
  box-shadow: 0 0 80px rgba(255, 197, 122, 0.2);
  display: block;
  margin: 0 auto;
}

.lightbox figcaption {
  color: var(--color-white);
  font-style: italic;
  margin-top: 16px;
}

.close-btn, .nav {
  position: absolute;
  background: none;
  border: none;
  color: var(--color-white);
  font-size: 26px;
  padding: 10px;
  cursor: pointer;
}

.close-btn { top: 20px; right: 24px; }
.nav.prev { left: 12px; top: 50%; transform: translateY(-50%); font-size: 42px; }
.nav.next { right: 12px; top: 50%; transform: translateY(-50%); font-size: 42px; }
</style>