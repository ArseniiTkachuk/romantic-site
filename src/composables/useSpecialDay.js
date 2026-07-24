import { computed } from 'vue'
import { config } from '../config.js'

function pad(n) {
    return String(n).padStart(2, '0')
}

export function useSpecialDay() {
    const today = new Date()
    const mmdd = `${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
    const full = `${today.getFullYear()}-${mmdd}`

    const special = computed(() => {
        // 1) Річниця стосунків — рахується автоматично від relationshipStart
        const start = new Date(config.relationshipStart)
        const startMmdd = `${pad(start.getMonth() + 1)}-${pad(start.getDate())}`
        if (startMmdd === mmdd) {
            const years = today.getFullYear() - start.getFullYear()
            if (years > 0) {
                return {
                    name: 'Річниця стосунків',
                    effect: 'petals',
                    heroMessage: `${years} ${yearsLabel(years)} разом. І це тільки початок`,
                    letter: {
                        title: `Сьогодні рівно ${years} ${yearsLabel(years)} як ми разом`,
                        body: `А пам'ятаєш з чого усе почалося, як ми вперше побачилися, як я сказав "Я думав ти нижча", як я запропонував зустрічатися, це все було лише ${years} ${yearsLabel(years)} тому.

Я задоволений що провів цей час з тобою і вдячний тобі що ти є в моєму житті.
Нехай ще один рік разом принесе нам більше щастя ніж увесь час разом до цього.`,
                    },
                }
            }
        }

        // 2) Свята з конфігу — спершу точна дата (YYYY-MM-DD), потім щорічна (MM-DD)
        const exact = config.holidays.find((h) => h.date === full)
        if (exact) return exact

        const recurring = config.holidays.find((h) => h.date === mmdd)
        if (recurring) return recurring

        return null
    })

    return { special }
}

function yearsLabel(years) {
    const mod10 = years % 10
    const mod100 = years % 100
    if (mod100 >= 11 && mod100 <= 14) return 'років'
    if (mod10 === 1) return 'рік'
    if (mod10 >= 2 && mod10 <= 4) return 'роки'
    return 'років'
}