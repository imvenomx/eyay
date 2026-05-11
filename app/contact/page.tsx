import type {Metadata} from 'next'
import ContactPage from '@/components/contact-page'
import {siteOgImage} from '@/lib/site'

export const metadata: Metadata = {
    title: 'Contatti — Eey Aay',
    description: 'Parliamo del tuo progetto. Compila il form e ti ricontatteremo entro 24 ore per discutere delle tue esigenze AI e automazione.',
    openGraph: {
        title: 'Contatti — Eey Aay',
        description: 'Parliamo del tuo progetto.',
        images: [{url: siteOgImage({title: 'Parliamo del tuo progetto', subtitle: 'Ti rispondiamo entro 24 ore', eyebrow: 'Contatti // Eey Aay'}), width: 1200, height: 630}],
        locale: 'it_IT',
    },
    alternates: {canonical: '/contact'},
}

export default function Page() {
    return <ContactPage/>
}
