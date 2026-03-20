import type {Metadata} from 'next'
import AboutPage from '@/components/about-page'

export const metadata: Metadata = {
    title: 'Chi Siamo — Eey Aay',
    description: 'Eey Aay è un\'azienda B2B specializzata in AI, automazione e trasformazione digitale che aiuta le imprese a risparmiare tempo, ridurre il lavoro manuale e creare nuovi flussi di ricavi.',
    openGraph: {
        title: 'Chi Siamo — Eey Aay',
        description: 'Il tuo partner AI per risultati di business concreti.',
        images: [{url: '/ogimg.png', width: 1200, height: 630}],
        locale: 'it_IT',
    },
}

export default function Page() {
    return <AboutPage/>
}
