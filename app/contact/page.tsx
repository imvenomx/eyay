import type {Metadata} from 'next'
import ContactPage from '@/components/contact-page'

export const metadata: Metadata = {
    title: 'Contatti — Eey Aay',
    description: 'Parliamo del tuo progetto. Compila il form e ti ricontatteremo entro 24 ore per discutere delle tue esigenze AI e automazione.',
    openGraph: {
        title: 'Contatti — Eey Aay',
        description: 'Parliamo del tuo progetto.',
        images: [{url: '/ogimg.png', width: 1200, height: 630}],
        locale: 'it_IT',
    },
}

export default function Page() {
    return <ContactPage/>
}
