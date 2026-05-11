import type {Metadata} from 'next'
import AboutPage from '@/components/about-page'
import {siteOgImage} from '@/lib/site'

export const metadata: Metadata = {
    title: 'Chi Siamo — Eey Aay',
    description: 'Eey Aay è un\'azienda B2B specializzata in AI, automazione e trasformazione digitale che aiuta le imprese a risparmiare tempo, ridurre il lavoro manuale e creare nuovi flussi di ricavi.',
    openGraph: {
        title: 'Chi Siamo — Eey Aay',
        description: 'Il tuo partner AI per risultati di business concreti.',
        images: [{url: siteOgImage({title: 'Chi Siamo', subtitle: 'Il tuo partner AI per risultati di business concreti', eyebrow: 'About // Eey Aay'}), width: 1200, height: 630}],
        locale: 'it_IT',
    },
    alternates: {canonical: '/about'},
}

export default function Page() {
    return <AboutPage/>
}
