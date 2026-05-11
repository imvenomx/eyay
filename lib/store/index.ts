import 'server-only'
import {fileStore} from './file-store'
import {supabaseStore} from './supabase-store'
import type {StoreDriver} from './types'

export {
    ContactSchema, NewsletterSchema,
    POST_CATEGORIES, POST_CATEGORY_LABEL,
    PostInputSchema, PostUpdateSchema,
    CaseStudyInputSchema, CaseStudyUpdateSchema,
} from './types'
export type {
    ContactInput, ContactRecord,
    NewsletterInput, NewsletterRecord,
    PostCategory, PostInput, PostRecord, PostUpdate,
    CaseStudyInput, CaseStudyMetric, CaseStudyRecord, CaseStudyUpdate,
} from './types'

function pickDriver(): StoreDriver {
    const explicit = (process.env.STORAGE_DRIVER || '').toLowerCase()
    if (explicit === 'supabase') return supabaseStore
    if (explicit === 'file') return fileStore

    const hasSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
    return hasSupabase ? supabaseStore : fileStore
}

let cached: StoreDriver | null = null
function driver(): StoreDriver {
    if (!cached) cached = pickDriver()
    return cached
}

export function getDriverName(): 'file' | 'supabase' {
    return driver().name
}

export const listContacts = () => driver().listContacts()
export const addContact: StoreDriver['addContact'] = (input) => driver().addContact(input)
export const listNewsletter = () => driver().listNewsletter()
export const addNewsletter: StoreDriver['addNewsletter'] = (input) => driver().addNewsletter(input)
export const listPublishedPosts: StoreDriver['listPublishedPosts'] = (opts) => driver().listPublishedPosts(opts)
export const getPublishedPostBySlug: StoreDriver['getPublishedPostBySlug'] = (slug) => driver().getPublishedPostBySlug(slug)
export const listAdminPosts = () => driver().listAdminPosts()
export const getAdminPostById: StoreDriver['getAdminPostById'] = (id) => driver().getAdminPostById(id)
export const addPost: StoreDriver['addPost'] = (input) => driver().addPost(input)
export const updatePost: StoreDriver['updatePost'] = (id, input) => driver().updatePost(id, input)
export const deletePost: StoreDriver['deletePost'] = (id) => driver().deletePost(id)
export const listPublishedCaseStudies: StoreDriver['listPublishedCaseStudies'] = (opts) => driver().listPublishedCaseStudies(opts)
export const getPublishedCaseStudyBySlug: StoreDriver['getPublishedCaseStudyBySlug'] = (slug) => driver().getPublishedCaseStudyBySlug(slug)
export const listAdminCaseStudies = () => driver().listAdminCaseStudies()
export const getAdminCaseStudyById: StoreDriver['getAdminCaseStudyById'] = (id) => driver().getAdminCaseStudyById(id)
export const addCaseStudy: StoreDriver['addCaseStudy'] = (input) => driver().addCaseStudy(input)
export const updateCaseStudy: StoreDriver['updateCaseStudy'] = (id, input) => driver().updateCaseStudy(id, input)
export const deleteCaseStudy: StoreDriver['deleteCaseStudy'] = (id) => driver().deleteCaseStudy(id)
