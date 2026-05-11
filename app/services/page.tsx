import type {Metadata} from 'next'
import ServicesPage from '@/components/services-page'
import {siteOgImage} from '@/lib/site'

export const metadata: Metadata = {
    title: 'Servizi — Eey Aay',
    description: '14 servizi su AI, automazione e crescita. Chatbot, voice agents, RAG, RPA, SEO, e-commerce, BI e altro. Risultati misurabili.',
    alternates: {canonical: '/services'},
    openGraph: {
        title: 'Servizi — Eey Aay',
        description: 'Tutto quello che facciamo, in una pagina.',
        images: [{url: siteOgImage({title: 'Servizi', subtitle: '14 servizi su AI, automazione e crescita', eyebrow: 'Servizi // Eey Aay'}), width: 1200, height: 630}],
        locale: 'it_IT',
    },
}

export default function Page() {
    return <ServicesPage/>
}
