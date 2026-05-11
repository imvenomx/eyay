export function readingTimeMinutes(text: string): number {
    const words = text.trim().split(/\s+/).length
    return Math.max(1, Math.round(words / 220))
}

export function formatReadingTime(text: string, lang: 'it' | 'en' = 'it'): string {
    const minutes = readingTimeMinutes(text)
    return lang === 'it' ? `${minutes} min di lettura` : `${minutes} min read`
}
