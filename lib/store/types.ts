import {z} from 'zod'

export const ContactSchema = z.object({
    name: z.string().trim().min(2, 'Il nome deve avere almeno 2 caratteri').max(120),
    email: z.string().trim().email('Email non valida').max(200),
    company: z.string().trim().max(200).optional().or(z.literal('')),
    message: z.string().trim().min(10, 'Il messaggio deve avere almeno 10 caratteri').max(4000),
})
export type ContactInput = z.infer<typeof ContactSchema>

export const NewsletterSchema = z.object({
    email: z.string().trim().email('Email non valida').max(200),
})
export type NewsletterInput = z.infer<typeof NewsletterSchema>

export interface ContactRecord extends ContactInput {
    id: string
    createdAt: string
}

export interface NewsletterRecord {
    id: string
    email: string
    createdAt: string
}

// ─── Posts ────────────────────────────────────────────────
export const POST_CATEGORIES = ['ai', 'automation', 'growth', 'case-study'] as const
export type PostCategory = typeof POST_CATEGORIES[number]

export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
    ai: 'AI',
    automation: 'Automazione',
    growth: 'Crescita',
    'case-study': 'Case Study',
}

export interface PostRecord {
    id: string
    slug: string
    title: string
    excerpt: string
    body: string
    category: PostCategory
    author: string
    coverImage: string | null
    published: boolean
    publishedAt: string | null
    createdAt: string
    updatedAt: string
}

export const PostInputSchema = z.object({
    slug: z.string()
        .trim()
        .min(3, 'Lo slug deve avere almeno 3 caratteri')
        .max(120, 'Lo slug è troppo lungo')
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Solo minuscole, numeri e trattini (es. "il-mio-articolo")'),
    title: z.string().trim().min(3, 'Il titolo deve avere almeno 3 caratteri').max(200),
    excerpt: z.string().trim().min(10, 'L\u2019estratto deve avere almeno 10 caratteri').max(400),
    body: z.string().trim().min(1, 'Il corpo non può essere vuoto'),
    category: z.enum(POST_CATEGORIES),
    author: z.string().trim().min(1).max(120).default('Eey Aay'),
    coverImage: z.string().trim().url('URL immagine non valido').max(500).optional().or(z.literal('')),
    published: z.boolean().default(false),
})
export type PostInput = z.infer<typeof PostInputSchema>

export const PostUpdateSchema = PostInputSchema.partial()
export type PostUpdate = z.infer<typeof PostUpdateSchema>

// ─── Case Studies ─────────────────────────────────────────
export interface CaseStudyMetric {
    label: string
    value: string
    hint?: string
}

export interface CaseStudyRecord {
    id: string
    slug: string
    title: string
    client: string
    industry: string
    excerpt: string
    body: string
    category: PostCategory
    coverImage: string | null
    clientLogo: string | null
    metrics: CaseStudyMetric[]
    published: boolean
    publishedAt: string | null
    createdAt: string
    updatedAt: string
}

const MetricSchema = z.object({
    label: z.string().trim().min(1).max(60),
    value: z.string().trim().min(1).max(40),
    hint: z.string().trim().max(120).optional().or(z.literal('')),
})

export const CaseStudyInputSchema = z.object({
    slug: z.string()
        .trim()
        .min(3, 'Lo slug deve avere almeno 3 caratteri')
        .max(120)
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Solo minuscole, numeri e trattini'),
    title: z.string().trim().min(3).max(200),
    client: z.string().trim().min(1, 'Inserisci il nome del cliente').max(120),
    industry: z.string().trim().min(1, 'Inserisci il settore').max(120),
    excerpt: z.string().trim().min(10).max(400),
    body: z.string().trim().min(1, 'Il corpo non può essere vuoto'),
    category: z.enum(POST_CATEGORIES),
    coverImage: z.string().trim().url('URL immagine non valido').max(500).optional().or(z.literal('')),
    clientLogo: z.string().trim().url('URL logo non valido').max(500).optional().or(z.literal('')),
    metrics: z.array(MetricSchema).max(6).default([]),
    published: z.boolean().default(false),
})
export type CaseStudyInput = z.infer<typeof CaseStudyInputSchema>

export const CaseStudyUpdateSchema = CaseStudyInputSchema.partial()
export type CaseStudyUpdate = z.infer<typeof CaseStudyUpdateSchema>

export interface StoreDriver {
    name: 'file' | 'supabase'
    listContacts(): Promise<ContactRecord[]>
    addContact(input: ContactInput): Promise<ContactRecord>
    listNewsletter(): Promise<NewsletterRecord[]>
    addNewsletter(input: NewsletterInput): Promise<{record: NewsletterRecord; duplicate: boolean}>
    listPublishedPosts(opts?: {category?: PostCategory}): Promise<PostRecord[]>
    getPublishedPostBySlug(slug: string): Promise<PostRecord | null>
    listAdminPosts(): Promise<PostRecord[]>
    getAdminPostById(id: string): Promise<PostRecord | null>
    addPost(input: PostInput): Promise<PostRecord>
    updatePost(id: string, input: PostUpdate): Promise<PostRecord | null>
    deletePost(id: string): Promise<boolean>
    listPublishedCaseStudies(opts?: {category?: PostCategory}): Promise<CaseStudyRecord[]>
    getPublishedCaseStudyBySlug(slug: string): Promise<CaseStudyRecord | null>
    listAdminCaseStudies(): Promise<CaseStudyRecord[]>
    getAdminCaseStudyById(id: string): Promise<CaseStudyRecord | null>
    addCaseStudy(input: CaseStudyInput): Promise<CaseStudyRecord>
    updateCaseStudy(id: string, input: CaseStudyUpdate): Promise<CaseStudyRecord | null>
    deleteCaseStudy(id: string): Promise<boolean>
}
