<template>
  <section class="section">
    <p class="eyebrow">спільні моменти</p>
    <h2>Наша галерея</h2>

    <div class="grid">
      <button
          v-for="(item, i) in config.gallery"
          :key="i"
          class="frame"
          :class="ratioClasses[i % ratioClasses.length]"
          :style="{ '--rot': rotations[i] + 'deg', '--shift': shifts[i] + 'px' }"
          @click="open(i)"
      >
        <!-- Відео -->
        <video
            v-if="item.type === 'video'"
            :src="item.src"
            autoplay
            muted
            loop
            playsinline
            class="media-element"
        ></video>

        <!-- Фото -->
        <img
            v-else
            :src="item.src"
            :alt="item.caption || 'спільне фото'"
            loading="lazy"
            class="media-element"
        />
      </button>
    </div>

    <Teleport to="body">
      <div v-if="activeIndex !== null" class="lightbox" @click.self="close">
        <button class="close-btn" @click="close" aria-label="Закрити">✕</button>
        <button class="nav prev" @click="prev" aria-label="Попередній елемент">‹</button>

        <figure>
          <!-- Збільшене відео у лайтбоксі -->
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

          <!-- Збільшене фото у лайтбоксі -->
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

const rotations = config.gallery.map(() => (Math.random() * 10 - 5).toFixed(1))
const shifts = config.gallery.map(() => Math.round(Math.random() * 56 - 12))
const ratioClasses = ['ratio-tall', 'ratio-square', 'ratio-wide', 'ratio-tall', 'ratio-square']

function open(i) { activeIndex.value = i }
function close() { activeIndex.value = null }
function next() { activeIndex.value = (activeIndex.value + 1) % config.gallery.length }
function prev() { activeIndex.value = (activeIndex.value - 1 + config.gallery.length) % config.gallery.length }
</script>

<style scoped>
.grid {
  columns: 3 220px;
  column-gap: 28px;
  margin-top: 56px;
}

.frame {
  background: var(--color-white);
  border: 1px solid var(--color-blush);
  border-radius: 10px;
  padding: 10px 10px 16px;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  break-inside: avoid;
  margin-bottom: 30px;
  transform: rotate(var(--rot)) translateY(var(--shift));
  transition: transform 0.25s ease, box-shadow 0.25s ease, z-index 0s;
  position: relative;
}

.frame:hover {
  transform: rotate(0deg) translateY(calc(var(--shift) - 6px)) scale(1.04);
  box-shadow: 0 26px 50px -18px rgba(122, 39, 57, 0.35);
  z-index: 5;
}

/* Загальні стилі для медіа-елементів у сітці */
.media-element {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  background: var(--color-blush);
  display: block;
}

.ratio-tall .media-element { aspect-ratio: 3 / 4; }
.ratio-square .media-element { aspect-ratio: 1 / 1; }
.ratio-wide .media-element { aspect-ratio: 5 / 4; }

@media (max-width: 640px) {
  .grid {
    columns: 2 150px;
    column-gap: 16px;
  }
  .frame {
    margin-bottom: 20px;
    transform: rotate(calc(var(--rot) * 0.5)) translateY(calc(var(--shift) * 0.4));
  }
}

.caption {
  font-family: var(--font-script);
  font-style: italic;
  font-size: 14px;
  color: #b60b1a;
  text-align: center;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(59, 31, 43, 0.9);
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
  border-radius: 8px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.4);
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
}

.close-btn { top: 20px; right: 24px; }
.nav.prev { left: 12px; top: 50%; transform: translateY(-50%); font-size: 42px; }
.nav.next { right: 12px; top: 50%; transform: translateY(-50%); font-size: 42px; }
</style>