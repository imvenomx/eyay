import type {MetadataRoute} from 'next'
import {listPublishedCaseStudies, listPublishedPosts} from '@/lib/store'
import {allServices} from '@/lib/services-data'
import {SITE_URL} from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    const staticRoutes: MetadataRoute.Sitemap = [
        {url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0},
        {url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8},
        {url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9},
        {url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7},
        {url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9},
        {url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.9},
        {url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3},
        {url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3},
    ]

    const serviceRoutes: MetadataRoute.Sitemap = allServices.map(s => ({
        url: `${SITE_URL}/service/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    let postRoutes: MetadataRoute.Sitemap = []
    let caseStudyRoutes: MetadataRoute.Sitemap = []
    try {
        const [posts, studies] = await Promise.all([
            listPublishedPosts(),
            listPublishedCaseStudies(),
        ])
        postRoutes = posts.map(p => ({
            url: `${SITE_URL}/blog/${p.slug}`,
            lastModified: new Date(p.updatedAt || p.publishedAt || now),
            changeFrequency: 'monthly',
            priority: 0.7,
        }))
        caseStudyRoutes = studies.map(s => ({
            url: `${SITE_URL}/case-studies/${s.slug}`,
            lastModified: new Date(s.updatedAt || s.publishedAt || now),
            changeFrequency: 'monthly',
            priority: 0.8,
        }))
    } catch {
        // If the store is unreachable at build time, ship the sitemap without posts/studies.
    }

    return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...caseStudyRoutes]
}
