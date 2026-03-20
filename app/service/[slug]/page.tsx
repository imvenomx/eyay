import {notFound} from 'next/navigation'
import {allServices, getServiceBySlug, getRelatedServices} from '@/lib/services-data'
import ServicePage from '@/components/service-page'
import type {Metadata} from 'next'

export function generateStaticParams() {
    return allServices.map(s => ({slug: s.slug}))
}

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params
    const service = getServiceBySlug(slug)
    if (!service) return {}

    return {
        title: `${service.title} — Eey Aay`,
        description: service.intro,
        openGraph: {
            title: `${service.title} — Eey Aay`,
            description: service.intro,
            url: `https://eeyaay.com/service/${service.slug}`,
            images: [{url: '/ogimg.png', width: 1200, height: 630}],
            locale: 'it_IT',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} — Eey Aay`,
            description: service.intro,
            images: ['/ogimg.png'],
        },
    }
}

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const service = getServiceBySlug(slug)
    if (!service) notFound()

    const related = getRelatedServices(service.relatedSlugs)

    return (
        <ServicePage
            data={{
                breadcrumb: service.title,
                headline: service.headline,
                intro: service.intro,
                blocks: service.blocks,
                relatedServices: related.map(r => ({title: r.title, href: `/service/${r.slug}`})),
                faq: service.faq,
            }}
        />
    )
}
