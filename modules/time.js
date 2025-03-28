const now = new Date()
const options = {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
}
export const formattedTime = now
    .toLocaleTimeString('ru-RU', options)
    .replace(',', '')
