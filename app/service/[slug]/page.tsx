import {promises as fs} from 'fs'
import path from 'path'
import {notFound} from 'next/navigation'
import {allServices, getServiceBySlug, getRelatedServices, type ServiceData} from '@/lib/services-data'
import ServicePage from '@/components/service-page'
import type {Metadata} from 'next'
import JsonLd from '@/components/json-ld'
import {breadcrumbSchema, serviceSchema} from '@/lib/schemas'
import {absoluteUrl, siteOgImage} from '@/lib/site'

async function getGeneratedImageTokens(service: ServiceData): Promise<string[]> {
    const dir = path.join(process.cwd(), 'public', 'services')
    const tokens: string[] = []
    for (let i = 0; i < service.blocks.length; i++) {
        const file = path.join(dir, `${service.slug}-${i + 1}.webp`)
        try {
            await fs.access(file)
            tokens.push(`${service.slug}-${i + 1}`)
        } catch { /* missing — will fall back */ }
    }
    return tokens
}

export function generateStaticParams() {
    return allServices.map(s => ({slug: s.slug}))
}

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params
    const service = getServiceBySlug(slug)
    if (!service) return {}

    const og = siteOgImage({title: service.title, subtitle: service.headline, eyebrow: 'Servizi // Eey Aay'})
    return {
        title: `${service.title} — Eey Aay`,
        description: service.intro,
        alternates: {canonical: `/service/${service.slug}`},
        openGraph: {
            title: `${service.title} — Eey Aay`,
            description: service.intro,
            url: `/service/${service.slug}`,
            images: [{url: og, width: 1200, height: 630}],
            locale: 'it_IT',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} — Eey Aay`,
            description: service.intro,
            images: [og],
        },
    }
}

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const service = getServiceBySlug(slug)
    if (!service) notFound()

    const [related, generatedImages] = await Promise.all([
        Promise.resolve(getRelatedServices(service.relatedSlugs)),
        getGeneratedImageTokens(service),
    ])
    const breadcrumbs = breadcrumbSchema([
        {name: 'Home', url: absoluteUrl('/')},
        {name: 'Servizi', url: absoluteUrl('/#services')},
        {name: service.title, url: absoluteUrl(`/service/${service.slug}`)},
    ])

    return (
        <>
        <JsonLd data={serviceSchema({slug: service.slug, title: service.title, description: service.intro})}/>
        <JsonLd data={breadcrumbs}/>
        <ServicePage
            data={{
                slug: service.slug,
                breadcrumb: service.title,
                headline: service.headline,
                intro: service.intro,
                blocks: service.blocks,
                relatedServices: related.map(r => ({title: r.title, href: `/service/${r.slug}`})),
                faq: service.faq,
                demo: service.demo,
                generatedImages,
            }}
        />
        </>
    )
}
