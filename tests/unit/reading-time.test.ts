import {describe, it, expect} from 'vitest'
import {readingTimeMinutes, formatReadingTime} from '@/lib/reading-time'

describe('reading time', () => {
    it('returns at least 1 minute', () => {
        expect(readingTimeMinutes('only a few words')).toBe(1)
    })

    it('formats in italian by default', () => {
        expect(formatReadingTime('hello '.repeat(220))).toBe('1 min di lettura')
    })

    it('formats in english when asked', () => {
        expect(formatReadingTime('hello '.repeat(220), 'en')).toBe('1 min read')
    })

    it('scales with word count', () => {
        const text = 'word '.repeat(660)
        expect(readingTimeMinutes(text)).toBe(3)
    })
})
