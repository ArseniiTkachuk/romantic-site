import { ref } from 'vue'
import { config } from '../config.js'

// Підтримуємо і масив (плейлист), і одиночний рядок для зворотної сумісності
const playlist = Array.isArray(config.musicPlaylist)
    ? config.musicPlaylist
    : config.music
        ? [config.music]
        : []

// Стан модульного рівня — спільний для ВСІХ компонентів, які викликають
// useBackgroundMusic(). Завдяки цьому і кнопка на вступному екрані,
// і кругла кнопка в кутку керують одним і тим самим аудіо.
const isPlaying = ref(false)
let audio = null
let fadeInterval = null
let trackIndex = 0
let initialized = false

function fadeVolume(target, duration = 800) {
    if (!audio) return
    clearInterval(fadeInterval)
    const steps = 20
    const stepTime = duration / steps
    const startVol = audio.volume
    const diff = target - startVol
    let i = 0

    fadeInterval = setInterval(() => {
        i++
        audio.volume = Math.min(1, Math.max(0, startVol + (diff * i) / steps))
        if (i >= steps) clearInterval(fadeInterval)
    }, stepTime)
}

function loadTrack(index) {
    trackIndex = ((index % playlist.length) + playlist.length) % playlist.length
    audio.src = playlist[trackIndex]
}

function playNextTrack() {
    loadTrack(trackIndex + 1)
    audio.volume = 0
    audio.play().then(() => fadeVolume(0.5, 800)).catch(() => {})
}

function ensureAudio() {
    if (initialized || !playlist.length) return
    initialized = true
    audio = new Audio()

    if (playlist.length > 1) {
        audio.loop = false
        audio.addEventListener('ended', playNextTrack)
    } else {
        audio.loop = true
    }

    loadTrack(0)
    audio.volume = 0
}

function play() {
    ensureAudio()
    if (!audio || isPlaying.value) return
    audio.volume = 0
    audio
        .play()
        .then(() => {
            isPlaying.value = true
            fadeVolume(0.5, 800)
        })
        .catch(() => {
            // Браузер міг заблокувати відтворення — просто ігноруємо
        })
}

function pause() {
    if (!audio || !isPlaying.value) return
    fadeVolume(0, 500)
    setTimeout(() => audio && audio.pause(), 500)
    isPlaying.value = false
}

function toggle() {
    ensureAudio()
    if (isPlaying.value) pause()
    else play()
}

export function useBackgroundMusic() {
    return { isPlaying, play, pause, toggle, hasMusic: playlist.length > 0 }
}