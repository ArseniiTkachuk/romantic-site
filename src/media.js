// Автоматично збирає всі фото й відео з папки src/assets/photos/
// Назви файлів: 1.jpg, 2.png, 3.mp4 ... Тип визначається за розширенням,
// порядок у галереї — за номером у назві.

const files = import.meta.glob(
    '/src/assets/photos/*.{jpg,jpeg,png,webp,gif,avif,mp4,webm,mov,m4v,ogv,JPG,JPEG,PNG,WEBP,GIF,MP4,MOV,WEBM}',
    { eager: true, query: '?url', import: 'default' }
)

const VIDEO_EXT = ['mp4', 'webm', 'mov', 'm4v', 'ogv']

const list = Object.entries(files)
    .map(([path, src]) => {
        const name = path.split('/').pop()
        const dot = name.lastIndexOf('.')
        const stem = name.slice(0, dot)
        const ext = name.slice(dot + 1).toLowerCase()
        const num = parseInt(stem, 10)
        return {
            name,
            num: Number.isNaN(num) ? Infinity : num,
            src,
            type: VIDEO_EXT.includes(ext) ? 'video' : 'photo',
        }
    })
    .sort((a, b) => {
        if (a.num !== b.num) return a.num < b.num ? -1 : 1
        return a.name.localeCompare(b.name, 'uk', { numeric: true })
    })

// Для галереї: [{ type: 'photo' | 'video', src }, ...]
export const gallery = list.map(({ type, src }) => ({ type, src }))

// Для моментів: знайти файл за номером, наприклад mediaByNumber(1)
export function mediaByNumber(n) {
    const found = list.find((f) => f.num === n)
    return found ? found.src : ''
}