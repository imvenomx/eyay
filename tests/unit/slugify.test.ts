import {describe, it, expect} from 'vitest'
import {slugify} from '@/lib/slugify'

describe('slugify', () => {
    it('lowercases and replaces spaces with hyphens', () => {
        expect(slugify('Hello World')).toBe('hello-world')
    })

    it('strips accents (Italian è / à / ù)', () => {
        expect(slugify('Perché Così')).toBe('perche-cosi')
    })

    it('drops non-alphanumeric punctuation', () => {
        expect(slugify("L'AI dei Chatbot!")).toBe('lai-dei-chatbot')
    })

    it('collapses repeated separators', () => {
        expect(slugify('  a   b  ')).toBe('a-b')
    })

    it('trims leading/trailing hyphens', () => {
        expect(slugify('---hello---')).toBe('hello')
    })

    it('truncates at 120 chars', () => {
        const long = 'a'.repeat(200)
        expect(slugify(long).length).toBe(120)
    })
})
