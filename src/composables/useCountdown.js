import { ref, onMounted, onUnmounted } from 'vue'

export function useCountdown(startDateString) {
    const startDate = new Date(startDateString)

    const time = ref({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalDays: 0,
    })

    let intervalId = null

    function update() {
        const now = new Date()
        let diffMs = now - startDate
        if (diffMs < 0) diffMs = 0

        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        let years = now.getFullYear() - startDate.getFullYear()
        let months = now.getMonth() - startDate.getMonth()
        let days = now.getDate() - startDate.getDate()
        let hours = now.getHours() - startDate.getHours()
        let minutes = now.getMinutes() - startDate.getMinutes()
        let seconds = now.getSeconds() - startDate.getSeconds()

        if (seconds < 0) { seconds += 60; minutes-- }
        if (minutes < 0) { minutes += 60; hours-- }
        if (hours < 0) { hours += 24; days-- }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
            days += prevMonth.getDate()
            months--
        }
        if (months < 0) { months += 12; years-- }

        time.value = { years, months, days, hours, minutes, seconds, totalDays }
    }

    onMounted(() => {
        update()
        intervalId = setInterval(update, 1000)
    })

    onUnmounted(() => {
        if (intervalId) clearInterval(intervalId)
    })

    return { time }
}