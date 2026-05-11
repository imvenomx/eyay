import {SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl, siteOgImage} from './site'
import {SOCIAL_LINKS} from './social-links'
import type {PostRecord} from './store/types'

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/eylogo.png'),
        description: SITE_DESCRIPTION,
        email: 'support@eeyaay.it',
        sameAs: SOCIAL_LINKS.map(s => s.href),
    }
}

export function localBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}#localbusiness`,
        name: SITE_NAME,
        url: SITE_URL,
        image: absoluteUrl(siteOgImage({title: SITE_NAME, subtitle: 'AI & Automazione per il Business Moderno'})),
        logo: absoluteUrl('/eylogo.png'),
        description: SITE_DESCRIPTION,
        email: 'support@eeyaay.it',
        priceRange: '€€',
        areaServed: {'@type': 'Country', name: 'Italy'},
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'IT',
        },
        sameAs: SOCIAL_LINKS.map(s => s.href),
    }
}

export function serviceSchema(opts: {slug: string; title: string; description: string; categoryLabel?: string}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: opts.title,
        description: opts.description,
        url: absoluteUrl(`/service/${opts.slug}`),
        provider: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
        areaServed: {'@type': 'Country', name: 'Italy'},
        ...(opts.categoryLabel ? {serviceType: opts.categoryLabel} : {}),
    }
}

export function websiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'it-IT',
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
    }
}

export function articleSchema(post: PostRecord) {
    const url = absoluteUrl(`/blog/${post.slug}`)
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage ? [post.coverImage] : [absoluteUrl(siteOgImage({title: post.title, subtitle: post.excerpt, eyebrow: 'Blog // Eey Aay'}))],
        datePublished: post.publishedAt || post.createdAt,
        dateModified: post.updatedAt,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: absoluteUrl('/eylogo.png'),
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        url,
        inLanguage: 'it-IT',
        articleSection: post.category,
    }
}

export function breadcrumbSchema(items: {name: string; url: string}[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: it.url,
        })),
    }
}
