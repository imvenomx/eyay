import {notFound} from 'next/navigation'
import {allServices, getServiceBySlug, getRelatedServices} from '@/lib/services-data'
import ServicePage from '@/components/service-page'

export function generateStaticParams() {
    return allServices.map(s => ({slug: s.slug}))
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
            }}
        />
    )
}
