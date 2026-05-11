/**
 * SEO rules engine — pure functions, no IO.
 * Used by the dashboard SEO panel (blog + case studies).
 */

export type SeoLevel = 'pass' | 'warn' | 'fail'

export interface SeoCheck {
    id: string
    label: string
    level: SeoLevel
    message: string
    weight: number
    fixable: boolean
    /** Which form field the AI fix targets (when fixable). */
    fixField?: 'title' | 'excerpt' | 'slug' | 'body'
}

export interface SeoInput {
    title: string
    slug: string
    excerpt: string
    body: string
    coverImage?: string | null
}

export interface SeoReport {
    score: number // 0-100
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    checks: SeoCheck[]
    passing: number
    total: number
}

// Heuristic constants (target ranges per Google's display rules)
const TITLE_MIN = 30
const TITLE_MAX = 65
const EXCERPT_MIN = 120
const EXCERPT_MAX = 160
const SLUG_MIN = 3
const SLUG_MAX = 70
const BODY_MIN_WORDS = 300

function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length
}

function hasMarkdownHeading(body: string, level: number): boolean {
    const re = new RegExp(`^${'#'.repeat(level)} `, 'm')
    return re.test(body)
}

function hasList(body: string): boolean {
    return /^\s*[-*+] /m.test(body) || /^\s*\d+\. /m.test(body)
}

function slugIsValid(slug: string): boolean {
    return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) && slug.length >= SLUG_MIN && slug.length <= SLUG_MAX
}

function titleContainsSlugKeyword(title: string, slug: string): boolean {
    const slugWords = slug.split('-').filter(w => w.length >= 4)
    if (slugWords.length === 0) return true
    const titleLower = title.toLowerCase()
    return slugWords.some(w => titleLower.includes(w))
}

export function analyzeSeo(input: SeoInput): SeoReport {
    const checks: SeoCheck[] = []

    // Title length
    const titleLen = input.title.trim().length
    if (titleLen >= TITLE_MIN && titleLen <= TITLE_MAX) {
        checks.push({id: 'title-length', label: 'Lunghezza titolo', level: 'pass', message: `${titleLen} caratteri — ottimo (target ${TITLE_MIN}-${TITLE_MAX}).`, weight: 12, fixable: false})
    } else if (titleLen === 0) {
        checks.push({id: 'title-length', label: 'Lunghezza titolo', level: 'fail', message: 'Titolo mancante.', weight: 12, fixable: false})
    } else if (titleLen < TITLE_MIN) {
        checks.push({id: 'title-length', label: 'Lunghezza titolo', level: 'warn', message: `${titleLen} caratteri — troppo corto (target ${TITLE_MIN}-${TITLE_MAX}).`, weight: 12, fixable: true, fixField: 'title'})
    } else {
        checks.push({id: 'title-length', label: 'Lunghezza titolo', level: 'warn', message: `${titleLen} caratteri — verrà troncato da Google (target ${TITLE_MIN}-${TITLE_MAX}).`, weight: 12, fixable: true, fixField: 'title'})
    }

    // Excerpt / meta description length
    const excerptLen = input.excerpt.trim().length
    if (excerptLen >= EXCERPT_MIN && excerptLen <= EXCERPT_MAX) {
        checks.push({id: 'excerpt-length', label: 'Lunghezza meta description', level: 'pass', message: `${excerptLen} caratteri — ottimo (target ${EXCERPT_MIN}-${EXCERPT_MAX}).`, weight: 12, fixable: false})
    } else if (excerptLen === 0) {
        checks.push({id: 'excerpt-length', label: 'Lunghezza meta description', level: 'fail', message: 'Estratto mancante.', weight: 12, fixable: false})
    } else if (excerptLen < EXCERPT_MIN) {
        checks.push({id: 'excerpt-length', label: 'Lunghezza meta description', level: 'warn', message: `${excerptLen} caratteri — troppo corto (target ${EXCERPT_MIN}-${EXCERPT_MAX}).`, weight: 12, fixable: true, fixField: 'excerpt'})
    } else {
        checks.push({id: 'excerpt-length', label: 'Lunghezza meta description', level: 'warn', message: `${excerptLen} caratteri — verrà troncato (target ${EXCERPT_MIN}-${EXCERPT_MAX}).`, weight: 12, fixable: true, fixField: 'excerpt'})
    }

    // Slug
    if (input.slug && slugIsValid(input.slug)) {
        checks.push({id: 'slug-valid', label: 'Slug valido', level: 'pass', message: `/${input.slug}`, weight: 8, fixable: false})
    } else if (!input.slug) {
        checks.push({id: 'slug-valid', label: 'Slug valido', level: 'fail', message: 'Slug mancante.', weight: 8, fixable: true, fixField: 'slug'})
    } else {
        checks.push({id: 'slug-valid', label: 'Slug valido', level: 'warn', message: 'Solo minuscole, numeri e trattini. Genera dal titolo.', weight: 8, fixable: true, fixField: 'slug'})
    }

    // Title contains keyword
    if (input.title && input.slug && titleContainsSlugKeyword(input.title, input.slug)) {
        checks.push({id: 'title-keyword', label: 'Parola chiave nel titolo', level: 'pass', message: 'Il titolo include parole chiave dello slug.', weight: 8, fixable: false})
    } else if (input.title && input.slug) {
        checks.push({id: 'title-keyword', label: 'Parola chiave nel titolo', level: 'warn', message: 'Lo slug non si trova nel titolo — verifica la coerenza semantica.', weight: 6, fixable: false})
    }

    // Body length
    const words = countWords(input.body)
    if (words >= BODY_MIN_WORDS) {
        checks.push({id: 'body-length', label: 'Lunghezza articolo', level: 'pass', message: `${words} parole — buona profondità.`, weight: 12, fixable: false})
    } else if (words === 0) {
        checks.push({id: 'body-length', label: 'Lunghezza articolo', level: 'fail', message: 'Corpo articolo vuoto.', weight: 12, fixable: false})
    } else {
        checks.push({id: 'body-length', label: 'Lunghezza articolo', level: 'warn', message: `${words} parole — sotto i ${BODY_MIN_WORDS} consigliati.`, weight: 10, fixable: false})
    }

    // H2 in body
    if (input.body.trim()) {
        if (hasMarkdownHeading(input.body, 2)) {
            checks.push({id: 'body-h2', label: 'Heading H2', level: 'pass', message: 'Almeno un H2 trovato.', weight: 10, fixable: false})
        } else {
            checks.push({id: 'body-h2', label: 'Heading H2', level: 'warn', message: 'Nessun H2 nel corpo — aggiungi sezioni per migliorare leggibilità.', weight: 10, fixable: true, fixField: 'body'})
        }
    }

    // List or H3
    if (input.body.trim()) {
        if (hasList(input.body) || hasMarkdownHeading(input.body, 3)) {
            checks.push({id: 'body-structure', label: 'Struttura ricca', level: 'pass', message: 'Liste o sotto-sezioni presenti.', weight: 6, fixable: false})
        } else {
            checks.push({id: 'body-structure', label: 'Struttura ricca', level: 'warn', message: 'Nessuna lista o H3 — la lettura veloce ne risente.', weight: 6, fixable: false})
        }
    }

    // Cover image
    if (input.coverImage && input.coverImage.trim().length > 0) {
        checks.push({id: 'cover-image', label: 'Cover image', level: 'pass', message: 'URL impostato.', weight: 6, fixable: false})
    } else {
        checks.push({id: 'cover-image', label: 'Cover image', level: 'warn', message: 'Manca la cover — l\u2019OG dinamico farà da fallback.', weight: 4, fixable: false})
    }

    // Score
    const total = checks.reduce((s, c) => s + c.weight, 0)
    const earned = checks.reduce((s, c) => s + (c.level === 'pass' ? c.weight : c.level === 'warn' ? c.weight * 0.5 : 0), 0)
    const score = total > 0 ? Math.round((earned / total) * 100) : 0
    const grade: SeoReport['grade'] = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F'
    const passing = checks.filter(c => c.level === 'pass').length

    return {score, grade, checks, passing, total: checks.length}
}
