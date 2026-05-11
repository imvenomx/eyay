import type {Metadata} from 'next'
import LegalPage from '@/components/legal-page'

export const metadata: Metadata = {
    title: 'Privacy Policy — Eey Aay',
    description: 'Informativa sulla privacy di Eey Aay: quali dati raccogliamo, perché e come puoi esercitare i tuoi diritti.',
    robots: {index: true, follow: true},
    alternates: {canonical: '/privacy'},
}

export default function PrivacyPage() {
    return (
        <LegalPage
            it={{
                eyebrow: 'Legal // Privacy',
                title: 'Privacy Policy',
                lastUpdated: '10 maggio 2026',
                intro: 'Questa informativa descrive come Eey Aay raccoglie, utilizza e protegge i tuoi dati personali quando visiti il nostro sito o ci contatti. Versione stub — il testo legale definitivo è in revisione.',
                sections: [
                    {
                        heading: 'Titolare del trattamento',
                        body: (
                            <>
                                <p>Eey Aay — Italia. Email: <a href="mailto:support@eeyaay.it" className="underline hover:text-black">support@eeyaay.it</a>.</p>
                                <p>Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali puoi contattarci all’indirizzo qui sopra.</p>
                            </>
                        ),
                    },
                    {
                        heading: 'Dati che raccogliamo',
                        body: (
                            <ul className="list-disc list-outside ml-5 space-y-2">
                                <li><strong>Form di contatto:</strong> nome, email, eventuale azienda e messaggio.</li>
                                <li><strong>Newsletter:</strong> indirizzo email.</li>
                                <li><strong>Analytics:</strong> dati di navigazione anonimi (pagine visitate, browser, paese).</li>
                                <li><strong>Cookie tecnici:</strong> strettamente necessari al funzionamento del sito.</li>
                            </ul>
                        ),
                    },
                    {
                        heading: 'Finalità del trattamento',
                        body: <p>Usiamo i tuoi dati per rispondere alle tue richieste, inviarti la newsletter (solo previa iscrizione), migliorare il sito e adempiere a obblighi di legge. Non vendiamo i tuoi dati a terzi.</p>,
                    },
                    {
                        heading: 'Base giuridica',
                        body: <p>Il trattamento avviene sulla base del tuo consenso (newsletter), dell’esecuzione di misure precontrattuali (form di contatto) e del legittimo interesse a mantenere il sito funzionante e sicuro.</p>,
                    },
                    {
                        heading: 'Conservazione dei dati',
                        body: <p>I dati del form di contatto sono conservati per il tempo necessario a evadere la tua richiesta e fino a 24 mesi successivi. Gli iscritti alla newsletter restano in lista finché non si disiscrivono.</p>,
                    },
                    {
                        heading: 'I tuoi diritti',
                        body: <p>Puoi richiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione o portabilità dei tuoi dati, oltre a opporti al trattamento. Scrivici a <a href="mailto:support@eeyaay.it" className="underline hover:text-black">support@eeyaay.it</a>.</p>,
                    },
                    {
                        heading: 'Modifiche a questa policy',
                        body: <p>Possiamo aggiornare questa informativa in qualsiasi momento. La data in alto indica l’ultima revisione. Per modifiche sostanziali ti avviseremo via email o tramite un banner sul sito.</p>,
                    },
                ],
            }}
            en={{
                eyebrow: 'Legal // Privacy',
                title: 'Privacy Policy',
                lastUpdated: 'May 10, 2026',
                intro: 'This policy explains how Eey Aay collects, uses and protects your personal data when you visit the site or get in touch. Stub version — final legal copy under review.',
                sections: [
                    {
                        heading: 'Data controller',
                        body: (
                            <>
                                <p>Eey Aay — Italy. Email: <a href="mailto:support@eeyaay.it" className="underline hover:text-black">support@eeyaay.it</a>.</p>
                                <p>For any request related to your personal data, please write to the address above.</p>
                            </>
                        ),
                    },
                    {
                        heading: 'Data we collect',
                        body: (
                            <ul className="list-disc list-outside ml-5 space-y-2">
                                <li><strong>Contact form:</strong> name, email, optional company and message.</li>
                                <li><strong>Newsletter:</strong> email address.</li>
                                <li><strong>Analytics:</strong> anonymous navigation data (pages visited, browser, country).</li>
                                <li><strong>Technical cookies:</strong> strictly required for the site to function.</li>
                            </ul>
                        ),
                    },
                    {
                        heading: 'Purpose of processing',
                        body: <p>We use your data to answer your questions, send you the newsletter (only after opt-in), improve the site and comply with legal obligations. We do not sell your data to third parties.</p>,
                    },
                    {
                        heading: 'Legal basis',
                        body: <p>Processing is based on your consent (newsletter), pre-contractual measures (contact form), and our legitimate interest in keeping the site running and secure.</p>,
                    },
                    {
                        heading: 'Data retention',
                        body: <p>Contact-form data is kept as long as needed to handle your request and for up to 24 months thereafter. Newsletter subscribers remain on the list until they unsubscribe.</p>,
                    },
                    {
                        heading: 'Your rights',
                        body: <p>You can request access, rectification, deletion, restriction or portability of your data — and object to processing — at any time. Email <a href="mailto:support@eeyaay.it" className="underline hover:text-black">support@eeyaay.it</a>.</p>,
                    },
                    {
                        heading: 'Changes to this policy',
                        body: <p>We may update this policy at any time. The date at the top reflects the latest revision. For material changes we&apos;ll notify you by email or via a site banner.</p>,
                    },
                ],
            }}
        />
    )
}
