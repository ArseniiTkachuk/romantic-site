<template>
  <!-- Тонка смуга прогресу скролу зверху сторінки -->
  <div class="scroll-progress" :style="{ width: progress + '%' }"></div>

  <!-- Крапки-навігація збоку з підписами (для широких екранів) -->
  <nav class="section-dots" aria-label="Навігація по сторінці">
    <button
        v-for="s in sections"
        :key="s.id"
        class="dot-item"
        :class="{ active: activeId === s.id }"
        @click="scrollTo(s.id)"
    >
      <span class="dot-label">{{ s.label }}</span>
      <span class="dot"></span>
    </button>
  </nav>

  <!-- Крапки-навігація знизу (для мобільних) -->
  <nav class="mobile-dots" aria-label="Навігація по сторінці">
    <span class="mobile-active-label">{{ activeLabel }}</span>
    <div class="mobile-dots-row">
      <button
          v-for="s in sections"
          :key="s.id"
          class="mobile-dot"
          :class="{ active: activeId === s.id }"
          :aria-label="s.label"
          @click="scrollTo(s.id)"
      ></button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Список секцій — id має співпадати з id, який додано в кожен компонент
const sections = [
  { id: 'hero', label: 'Початок' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'words', label: 'Слова' },
  { id: 'moments', label: 'Спогади' },
  { id: 'letter', label: 'Лист' },
  { id: 'footer', label: 'Кінець' },
]

const progress = ref(0)
const activeId = ref(sections[0].id)
let observer = null

const activeLabel = computed(() => {
  return sections.find((s) => s.id === activeId.value)?.label || ''
})

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)

  // IntersectionObserver визначає, яка секція зараз "активна" на екрані
  observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  )

  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-gold, #d4a24c), var(--color-rose-deep, #b60b1a));
  z-index: 200;
  transition: width 0.1s linear;
}

/* ---------- Десктоп: крапки збоку з підписами ---------- */
.section-dots {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 150;
}

.dot-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.dot-label {
  font-family: var(--font-utility);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  transition: color 0.25s ease, opacity 0.25s ease;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.dot-item:hover .dot-label {
  color: rgba(255, 255, 255, 0.9);
}

.dot-item:hover .dot {
  transform: scale(1.2);
}

.dot-item.active .dot-label {
  color: var(--color-white, #fff);
  font-weight: 600;
}

.dot-item.active .dot {
  background: var(--color-rose-deep, #b60b1a);
  border-color: var(--color-rose-deep, #b60b1a);
  transform: scale(1.3);
}

@media (max-width: 900px) {
  .section-dots {
    display: none;
  }
}

/* ---------- Мобільні: панель з крапками знизу ---------- */
.mobile-dots {
  display: none;
}

@media (max-width: 900px) {
  .mobile-dots {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: fixed;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
    z-index: 150;
    background: rgba(43, 0, 3, 0.55);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 8px 16px 10px;
  }

  .mobile-active-label {
    font-family: var(--font-utility);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-white, #fff);
    opacity: 0.85;
  }

  .mobile-dots-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mobile-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 0;
    cursor: pointer;
    transition: background 0.25s ease, transform 0.25s ease;
  }

  .mobile-dot.active {
    background: var(--color-rose-deep, #b60b1a);
    border-color: var(--color-rose-deep, #b60b1a);
    transform: scale(1.4);
  }
}
</style>