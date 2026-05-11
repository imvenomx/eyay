import 'server-only'
import {createClient, type SupabaseClient} from '@supabase/supabase-js'
import type {
    CaseStudyInput, CaseStudyMetric, CaseStudyRecord, CaseStudyUpdate,
    ContactInput, ContactRecord,
    NewsletterInput, NewsletterRecord,
    PostCategory, PostInput, PostRecord, PostUpdate,
    StoreDriver,
} from './types'

interface ContactRow {
    id: string
    name: string
    email: string
    company: string | null
    message: string
    created_at: string
}

interface NewsletterRow {
    id: string
    email: string
    created_at: string
}

interface PostRow {
    id: string
    slug: string
    title: string
    excerpt: string
    body: string
    category: PostCategory
    author: string
    cover_image: string | null
    published: boolean
    published_at: string | null
    created_at: string
    updated_at: string
}

function postFromRow(row: PostRow): PostRecord {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        body: row.body,
        category: row.category,
        author: row.author,
        coverImage: row.cover_image,
        published: row.published,
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }
}

const POST_COLS = 'id, slug, title, excerpt, body, category, author, cover_image, published, published_at, created_at, updated_at'

interface CaseStudyRow {
    id: string
    slug: string
    title: string
    client: string
    industry: string
    excerpt: string
    body: string
    category: PostCategory
    cover_image: string | null
    client_logo: string | null
    metrics: CaseStudyMetric[] | null
    published: boolean
    published_at: string | null
    created_at: string
    updated_at: string
}

const CASE_STUDY_COLS = 'id, slug, title, client, industry, excerpt, body, category, cover_image, client_logo, metrics, published, published_at, created_at, updated_at'

function caseStudyFromRow(row: CaseStudyRow): CaseStudyRecord {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        client: row.client,
        industry: row.industry,
        excerpt: row.excerpt,
        body: row.body,
        category: row.category,
        coverImage: row.cover_image,
        clientLogo: row.client_logo,
        metrics: Array.isArray(row.metrics) ? row.metrics : [],
        published: row.published,
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }
}

let cachedClient: SupabaseClient | null = null

function getClient(): SupabaseClient {
    if (cachedClient) return cachedClient
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
        throw new Error('Supabase env vars missing: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    }
    cachedClient = createClient(url, key, {
        auth: {persistSession: false, autoRefreshToken: false},
    })
    return cachedClient
}

function contactFromRow(row: ContactRow): ContactRecord {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        company: row.company || '',
        message: row.message,
        createdAt: row.created_at,
    }
}

function newsletterFromRow(row: NewsletterRow): NewsletterRecord {
    return {id: row.id, email: row.email, createdAt: row.created_at}
}

export const supabaseStore: StoreDriver = {
    name: 'supabase',

    async listContacts() {
        const {data, error} = await getClient()
            .from('contacts')
            .select('id, name, email, company, message, created_at')
            .order('created_at', {ascending: false})
        if (error) throw new Error(`Supabase listContacts: ${error.message}`)
        return (data as ContactRow[]).map(contactFromRow)
    },

    async addContact(input: ContactInput) {
        const {data, error} = await getClient()
            .from('contacts')
            .insert({
                name: input.name,
                email: input.email,
                company: input.company || null,
                message: input.message,
            })
            .select('id, name, email, company, message, created_at')
            .single()
        if (error || !data) throw new Error(`Supabase addContact: ${error?.message || 'no data'}`)
        return contactFromRow(data as ContactRow)
    },

    async listNewsletter() {
        const {data, error} = await getClient()
            .from('newsletter_subscribers')
            .select('id, email, created_at')
            .order('created_at', {ascending: false})
        if (error) throw new Error(`Supabase listNewsletter: ${error.message}`)
        return (data as NewsletterRow[]).map(newsletterFromRow)
    },

    async addNewsletter(input: NewsletterInput) {
        const client = getClient()
        const email = input.email.trim()
        const lower = email.toLowerCase()

        const {data: existing} = await client
            .from('newsletter_subscribers')
            .select('id, email, created_at')
            .eq('email', lower)
            .maybeSingle()
        if (existing) return {record: newsletterFromRow(existing as NewsletterRow), duplicate: true}

        const {data, error} = await client
            .from('newsletter_subscribers')
            .insert({email: lower})
            .select('id, email, created_at')
            .single()
        if (error || !data) {
            if (error?.code === '23505') {
                const {data: dup} = await client
                    .from('newsletter_subscribers')
                    .select('id, email, created_at')
                    .eq('email', lower)
                    .single()
                if (dup) return {record: newsletterFromRow(dup as NewsletterRow), duplicate: true}
            }
            throw new Error(`Supabase addNewsletter: ${error?.message || 'no data'}`)
        }
        return {record: newsletterFromRow(data as NewsletterRow), duplicate: false}
    },

    async listPublishedPosts(opts?: {category?: PostCategory}) {
        let q = getClient()
            .from('posts')
            .select(POST_COLS)
            .eq('published', true)
            .order('published_at', {ascending: false})
        if (opts?.category) q = q.eq('category', opts.category)
        const {data, error} = await q
        if (error) throw new Error(`Supabase listPublishedPosts: ${error.message}`)
        return (data as PostRow[]).map(postFromRow)
    },

    async getPublishedPostBySlug(slug: string) {
        const {data, error} = await getClient()
            .from('posts')
            .select(POST_COLS)
            .eq('slug', slug)
            .eq('published', true)
            .maybeSingle()
        if (error) throw new Error(`Supabase getPublishedPostBySlug: ${error.message}`)
        return data ? postFromRow(data as PostRow) : null
    },

    async listAdminPosts() {
        const {data, error} = await getClient()
            .from('posts')
            .select(POST_COLS)
            .order('updated_at', {ascending: false})
        if (error) throw new Error(`Supabase listAdminPosts: ${error.message}`)
        return (data as PostRow[]).map(postFromRow)
    },

    async getAdminPostById(id: string) {
        const {data, error} = await getClient()
            .from('posts')
            .select(POST_COLS)
            .eq('id', id)
            .maybeSingle()
        if (error) throw new Error(`Supabase getAdminPostById: ${error.message}`)
        return data ? postFromRow(data as PostRow) : null
    },

    async addPost(input: PostInput) {
        const now = new Date().toISOString()
        const {data, error} = await getClient()
            .from('posts')
            .insert({
                slug: input.slug,
                title: input.title,
                excerpt: input.excerpt,
                body: input.body,
                category: input.category,
                author: input.author,
                cover_image: input.coverImage ? input.coverImage : null,
                published: input.published,
                published_at: input.published ? now : null,
            })
            .select(POST_COLS)
            .single()
        if (error) {
            if (error.code === '23505') throw new Error('SLUG_EXISTS')
            throw new Error(`Supabase addPost: ${error.message}`)
        }
        return postFromRow(data as PostRow)
    },

    async updatePost(id: string, input: PostUpdate) {
        const client = getClient()
        const {data: prev, error: prevErr} = await client
            .from('posts')
            .select(POST_COLS)
            .eq('id', id)
            .maybeSingle()
        if (prevErr) throw new Error(`Supabase updatePost (load): ${prevErr.message}`)
        if (!prev) return null
        const prevRow = prev as PostRow

        const wasPublished = prevRow.published
        const willBePublished = input.published ?? wasPublished
        const now = new Date().toISOString()

        const patch: Partial<PostRow> = {}
        if (input.slug !== undefined) patch.slug = input.slug
        if (input.title !== undefined) patch.title = input.title
        if (input.excerpt !== undefined) patch.excerpt = input.excerpt
        if (input.body !== undefined) patch.body = input.body
        if (input.category !== undefined) patch.category = input.category
        if (input.author !== undefined) patch.author = input.author
        if (input.coverImage !== undefined) {
            patch.cover_image = input.coverImage ? input.coverImage : null
        }
        if (input.published !== undefined) {
            patch.published = willBePublished
            if (!wasPublished && willBePublished) patch.published_at = now
            else if (wasPublished && !willBePublished) patch.published_at = null
        }

        const {data, error} = await client
            .from('posts')
            .update(patch)
            .eq('id', id)
            .select(POST_COLS)
            .single()
        if (error) {
            if (error.code === '23505') throw new Error('SLUG_EXISTS')
            throw new Error(`Supabase updatePost: ${error.message}`)
        }
        return postFromRow(data as PostRow)
    },

    async deletePost(id: string) {
        const {error, count} = await getClient()
            .from('posts')
            .delete({count: 'exact'})
            .eq('id', id)
        if (error) throw new Error(`Supabase deletePost: ${error.message}`)
        return (count ?? 0) > 0
    },

    async listPublishedCaseStudies(opts?: {category?: PostCategory}) {
        let q = getClient()
            .from('case_studies')
            .select(CASE_STUDY_COLS)
            .eq('published', true)
            .order('published_at', {ascending: false})
        if (opts?.category) q = q.eq('category', opts.category)
        const {data, error} = await q
        if (error) throw new Error(`Supabase listPublishedCaseStudies: ${error.message}`)
        return (data as CaseStudyRow[]).map(caseStudyFromRow)
    },

    async getPublishedCaseStudyBySlug(slug: string) {
        const {data, error} = await getClient()
            .from('case_studies')
            .select(CASE_STUDY_COLS)
            .eq('slug', slug)
            .eq('published', true)
            .maybeSingle()
        if (error) throw new Error(`Supabase getPublishedCaseStudyBySlug: ${error.message}`)
        return data ? caseStudyFromRow(data as CaseStudyRow) : null
    },

    async listAdminCaseStudies() {
        const {data, error} = await getClient()
            .from('case_studies')
            .select(CASE_STUDY_COLS)
            .order('updated_at', {ascending: false})
        if (error) throw new Error(`Supabase listAdminCaseStudies: ${error.message}`)
        return (data as CaseStudyRow[]).map(caseStudyFromRow)
    },

    async getAdminCaseStudyById(id: string) {
        const {data, error} = await getClient()
            .from('case_studies')
            .select(CASE_STUDY_COLS)
            .eq('id', id)
            .maybeSingle()
        if (error) throw new Error(`Supabase getAdminCaseStudyById: ${error.message}`)
        return data ? caseStudyFromRow(data as CaseStudyRow) : null
    },

    async addCaseStudy(input: CaseStudyInput) {
        const now = new Date().toISOString()
        const {data, error} = await getClient()
            .from('case_studies')
            .insert({
                slug: input.slug,
                title: input.title,
                client: input.client,
                industry: input.industry,
                excerpt: input.excerpt,
                body: input.body,
                category: input.category,
                cover_image: input.coverImage ? input.coverImage : null,
                client_logo: input.clientLogo ? input.clientLogo : null,
                metrics: input.metrics,
                published: input.published,
                published_at: input.published ? now : null,
            })
            .select(CASE_STUDY_COLS)
            .single()
        if (error) {
            if (error.code === '23505') throw new Error('SLUG_EXISTS')
            throw new Error(`Supabase addCaseStudy: ${error.message}`)
        }
        return caseStudyFromRow(data as CaseStudyRow)
    },

    async updateCaseStudy(id: string, input: CaseStudyUpdate) {
        const client = getClient()
        const {data: prev, error: prevErr} = await client
            .from('case_studies')
            .select(CASE_STUDY_COLS)
            .eq('id', id)
            .maybeSingle()
        if (prevErr) throw new Error(`Supabase updateCaseStudy (load): ${prevErr.message}`)
        if (!prev) return null
        const prevRow = prev as CaseStudyRow

        const wasPublished = prevRow.published
        const willBePublished = input.published ?? wasPublished
        const now = new Date().toISOString()

        const patch: Partial<CaseStudyRow> = {}
        if (input.slug !== undefined) patch.slug = input.slug
        if (input.title !== undefined) patch.title = input.title
        if (input.client !== undefined) patch.client = input.client
        if (input.industry !== undefined) patch.industry = input.industry
        if (input.excerpt !== undefined) patch.excerpt = input.excerpt
        if (input.body !== undefined) patch.body = input.body
        if (input.category !== undefined) patch.category = input.category
        if (input.coverImage !== undefined) patch.cover_image = input.coverImage ? input.coverImage : null
        if (input.clientLogo !== undefined) patch.client_logo = input.clientLogo ? input.clientLogo : null
        if (input.metrics !== undefined) patch.metrics = input.metrics
        if (input.published !== undefined) {
            patch.published = willBePublished
            if (!wasPublished && willBePublished) patch.published_at = now
            else if (wasPublished && !willBePublished) patch.published_at = null
        }

        const {data, error} = await client
            .from('case_studies')
            .update(patch)
            .eq('id', id)
            .select(CASE_STUDY_COLS)
            .single()
        if (error) {
            if (error.code === '23505') throw new Error('SLUG_EXISTS')
            throw new Error(`Supabase updateCaseStudy: ${error.message}`)
        }
        return caseStudyFromRow(data as CaseStudyRow)
    },

    async deleteCaseStudy(id: string) {
        const {error, count} = await getClient()
            .from('case_studies')
            .delete({count: 'exact'})
            .eq('id', id)
        if (error) throw new Error(`Supabase deleteCaseStudy: ${error.message}`)
        return (count ?? 0) > 0
    },
}
