import 'server-only'
import {promises as fs} from 'fs'
import path from 'path'
import {randomUUID} from 'crypto'
import type {
    CaseStudyInput, CaseStudyRecord, CaseStudyUpdate,
    ContactInput, ContactRecord,
    NewsletterInput, NewsletterRecord,
    PostCategory, PostInput, PostRecord, PostUpdate,
    StoreDriver,
} from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')
const CASE_STUDIES_FILE = path.join(DATA_DIR, 'case-studies.json')

const SEED_POST: PostRecord = {
    id: '00000000-0000-0000-0000-000000000001',
    slug: 'benvenuto-su-eey-aay',
    title: 'Benvenuto su Eey Aay',
    excerpt: 'Apriamo il blog con un post di benvenuto. Cosa pubblicheremo qui, perché e come ti sarà utile.',
    body: `## Benvenuto

Questo è il primo post del blog di **Eey Aay**. Qui condivideremo:

- Casi reali di automazione e AI applicata al business
- Guide pratiche su chatbot, agenti vocali e RAG
- Lezioni dai progetti che facciamo per i nostri clienti

## Cosa aspettarsi

I post saranno **brevi, concreti e azionabili**. Niente fuffa, niente "intelligenza artificiale generale entro 5 anni". Solo cose che puoi davvero implementare nella tua azienda.

> "Risultati concreti, non tecnologia appariscente."

## Vuoi suggerire un argomento?

Scrivici e ti rispondiamo: hello@eeyaay.com`,
    category: 'ai',
    author: 'Eey Aay',
    coverImage: null,
    published: true,
    publishedAt: '2026-05-01T09:00:00.000Z',
    createdAt: '2026-05-01T09:00:00.000Z',
    updatedAt: '2026-05-01T09:00:00.000Z',
}

const SEED_CASE_STUDY: CaseStudyRecord = {
    id: '00000000-0000-0000-0000-000000000010',
    slug: 'chatbot-ai-pmi-italiana',
    title: 'Chatbot AI per PMI italiana: -68% di ticket di supporto',
    client: 'Acme PMI Srl',
    industry: 'B2B SaaS',
    excerpt: 'Sostituito il modulo di contatto statico con un chatbot AI multilingua. Lead qualificati salgono del 3x, tempo di risposta da ore a secondi.',
    body: `## Il contesto

Un\u2019azienda B2B italiana del settore SaaS aveva un volume crescente di richieste ripetitive sul supporto. Il team gestiva tutto manualmente via email, con tempi di risposta di 24-48 ore e nessuna qualificazione automatica.

## La sfida

- **Volume alto, valore basso:** 70% delle richieste erano FAQ
- **Lead persi:** nessuna risposta nel weekend = prospect raffreddati
- **Team sovraccarico:** 2 persone full-time dedicate al primo livello

## La soluzione

Abbiamo progettato un **chatbot AI conversazionale** integrato nel sito e WhatsApp Business, alimentato da un sistema RAG sulla documentazione interna.

- Knowledge base con 240 articoli indicizzati
- Qualificazione lead con 4 criteri + sync HubSpot in tempo reale
- Escalation intelligente a operatore umano quando serve
- Supporto IT/EN/DE nativo

## I risultati a 90 giorni

I numeri parlano da soli — il chatbot ha gestito oltre 8.000 conversazioni nei primi tre mesi, deviando la maggior parte del traffico dal team umano.

> "Pensavamo di dover assumere altre due persone. Invece abbiamo recuperato 30 ore a settimana e ora i ragazzi si dedicano ai clienti enterprise."
> — Direttore Operations`,
    category: 'case-study',
    coverImage: null,
    clientLogo: null,
    metrics: [
        {label: 'Ticket di supporto', value: '-68%', hint: 'in 90 giorni'},
        {label: 'Lead qualificati', value: '+3x', hint: 'mese su mese'},
        {label: 'Tempo di risposta', value: '< 5s', hint: '24/7'},
        {label: 'Costo per lead', value: '-54%', hint: 'vs. baseline'},
    ],
    published: true,
    publishedAt: '2026-04-15T09:00:00.000Z',
    createdAt: '2026-04-15T09:00:00.000Z',
    updatedAt: '2026-04-15T09:00:00.000Z',
}

async function ensureFile(file: string, seed: unknown = []) {
    await fs.mkdir(DATA_DIR, {recursive: true})
    try {
        await fs.access(file)
    } catch {
        await fs.writeFile(file, JSON.stringify(seed, null, 2), 'utf8')
    }
}

async function readJson<T>(file: string, seed: T[] = []): Promise<T[]> {
    await ensureFile(file, seed)
    const raw = await fs.readFile(file, 'utf8')
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

async function writeJson<T>(file: string, data: T[]): Promise<void> {
    await ensureFile(file)
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}

export const fileStore: StoreDriver = {
    name: 'file',

    async listContacts() {
        const records = await readJson<ContactRecord>(CONTACTS_FILE)
        return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    },

    async addContact(input: ContactInput) {
        const records = await readJson<ContactRecord>(CONTACTS_FILE)
        const record: ContactRecord = {
            id: randomUUID(),
            createdAt: new Date().toISOString(),
            ...input,
            company: input.company || '',
        }
        records.push(record)
        await writeJson(CONTACTS_FILE, records)
        return record
    },

    async listNewsletter() {
        const records = await readJson<NewsletterRecord>(NEWSLETTER_FILE)
        return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    },

    async addNewsletter(input: NewsletterInput) {
        const records = await readJson<NewsletterRecord>(NEWSLETTER_FILE)
        const email = input.email.toLowerCase()
        const existing = records.find(r => r.email.toLowerCase() === email)
        if (existing) return {record: existing, duplicate: true}
        const record: NewsletterRecord = {
            id: randomUUID(),
            email: input.email,
            createdAt: new Date().toISOString(),
        }
        records.push(record)
        await writeJson(NEWSLETTER_FILE, records)
        return {record, duplicate: false}
    },

    async listPublishedPosts(opts?: {category?: PostCategory}) {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        const published = all.filter(p => p.published)
        const filtered = opts?.category ? published.filter(p => p.category === opts.category) : published
        return filtered.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    },

    async getPublishedPostBySlug(slug: string) {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        const post = all.find(p => p.slug === slug && p.published)
        return post || null
    },

    async listAdminPosts() {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    },

    async getAdminPostById(id: string) {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        return all.find(p => p.id === id) || null
    },

    async addPost(input: PostInput) {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        if (all.some(p => p.slug === input.slug)) {
            throw new Error('SLUG_EXISTS')
        }
        const now = new Date().toISOString()
        const record: PostRecord = {
            id: randomUUID(),
            slug: input.slug,
            title: input.title,
            excerpt: input.excerpt,
            body: input.body,
            category: input.category,
            author: input.author,
            coverImage: input.coverImage ? input.coverImage : null,
            published: input.published,
            publishedAt: input.published ? now : null,
            createdAt: now,
            updatedAt: now,
        }
        all.push(record)
        await writeJson(POSTS_FILE, all)
        return record
    },

    async updatePost(id: string, input: PostUpdate) {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        const idx = all.findIndex(p => p.id === id)
        if (idx === -1) return null
        const prev = all[idx]
        if (input.slug && input.slug !== prev.slug && all.some(p => p.slug === input.slug)) {
            throw new Error('SLUG_EXISTS')
        }
        const wasPublished = prev.published
        const willBePublished = input.published ?? prev.published
        const now = new Date().toISOString()
        const next: PostRecord = {
            ...prev,
            slug: input.slug ?? prev.slug,
            title: input.title ?? prev.title,
            excerpt: input.excerpt ?? prev.excerpt,
            body: input.body ?? prev.body,
            category: input.category ?? prev.category,
            author: input.author ?? prev.author,
            coverImage: input.coverImage === undefined
                ? prev.coverImage
                : (input.coverImage ? input.coverImage : null),
            published: willBePublished,
            publishedAt: !wasPublished && willBePublished
                ? now
                : (wasPublished && !willBePublished ? null : prev.publishedAt),
            updatedAt: now,
        }
        all[idx] = next
        await writeJson(POSTS_FILE, all)
        return next
    },

    async deletePost(id: string) {
        const all = await readJson<PostRecord>(POSTS_FILE, [SEED_POST])
        const next = all.filter(p => p.id !== id)
        if (next.length === all.length) return false
        await writeJson(POSTS_FILE, next)
        return true
    },

    async listPublishedCaseStudies(opts?: {category?: PostCategory}) {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        const published = all.filter(c => c.published)
        const filtered = opts?.category ? published.filter(c => c.category === opts.category) : published
        return filtered.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    },

    async getPublishedCaseStudyBySlug(slug: string) {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        return all.find(c => c.slug === slug && c.published) || null
    },

    async listAdminCaseStudies() {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    },

    async getAdminCaseStudyById(id: string) {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        return all.find(c => c.id === id) || null
    },

    async addCaseStudy(input: CaseStudyInput) {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        if (all.some(c => c.slug === input.slug)) throw new Error('SLUG_EXISTS')
        const now = new Date().toISOString()
        const record: CaseStudyRecord = {
            id: randomUUID(),
            slug: input.slug,
            title: input.title,
            client: input.client,
            industry: input.industry,
            excerpt: input.excerpt,
            body: input.body,
            category: input.category,
            coverImage: input.coverImage ? input.coverImage : null,
            clientLogo: input.clientLogo ? input.clientLogo : null,
            metrics: input.metrics,
            published: input.published,
            publishedAt: input.published ? now : null,
            createdAt: now,
            updatedAt: now,
        }
        all.push(record)
        await writeJson(CASE_STUDIES_FILE, all)
        return record
    },

    async updateCaseStudy(id: string, input: CaseStudyUpdate) {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        const idx = all.findIndex(c => c.id === id)
        if (idx === -1) return null
        const prev = all[idx]
        if (input.slug && input.slug !== prev.slug && all.some(c => c.slug === input.slug)) {
            throw new Error('SLUG_EXISTS')
        }
        const wasPublished = prev.published
        const willBePublished = input.published ?? prev.published
        const now = new Date().toISOString()
        const next: CaseStudyRecord = {
            ...prev,
            slug: input.slug ?? prev.slug,
            title: input.title ?? prev.title,
            client: input.client ?? prev.client,
            industry: input.industry ?? prev.industry,
            excerpt: input.excerpt ?? prev.excerpt,
            body: input.body ?? prev.body,
            category: input.category ?? prev.category,
            coverImage: input.coverImage === undefined ? prev.coverImage : (input.coverImage ? input.coverImage : null),
            clientLogo: input.clientLogo === undefined ? prev.clientLogo : (input.clientLogo ? input.clientLogo : null),
            metrics: input.metrics ?? prev.metrics,
            published: willBePublished,
            publishedAt: !wasPublished && willBePublished
                ? now
                : (wasPublished && !willBePublished ? null : prev.publishedAt),
            updatedAt: now,
        }
        all[idx] = next
        await writeJson(CASE_STUDIES_FILE, all)
        return next
    },

    async deleteCaseStudy(id: string) {
        const all = await readJson<CaseStudyRecord>(CASE_STUDIES_FILE, [SEED_CASE_STUDY])
        const next = all.filter(c => c.id !== id)
        if (next.length === all.length) return false
        await writeJson(CASE_STUDIES_FILE, next)
        return true
    },
}
