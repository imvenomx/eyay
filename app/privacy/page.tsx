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
            eyebrow="Legal // Privacy"
            title="Privacy Policy"
            lastUpdated="10 maggio 2026"
            intro="Questa informativa descrive come Eey Aay raccoglie, utilizza e protegge i tuoi dati personali quando visiti il nostro sito o ci contatti. Versione stub — il testo legale definitivo è in revisione."
            sections={[
                {
                    heading: 'Titolare del trattamento',
                    body: (
                        <>
                            <p>Eey Aay — Italia. Email: <a href="mailto:hello@eeyaay.com" className="underline hover:text-black">hello@eeyaay.com</a>.</p>
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
                    body: (
                        <p>Usiamo i tuoi dati per rispondere alle tue richieste, inviarti la newsletter (solo previa iscrizione), migliorare il sito e adempiere a obblighi di legge. Non vendiamo i tuoi dati a terzi.</p>
                    ),
                },
                {
                    heading: 'Base giuridica',
                    body: (
                        <p>Il trattamento avviene sulla base del tuo consenso (newsletter), dell’esecuzione di misure precontrattuali (form di contatto) e del legittimo interesse a mantenere il sito funzionante e sicuro.</p>
                    ),
                },
                {
                    heading: 'Conservazione dei dati',
                    body: (
                        <p>I dati del form di contatto sono conservati per il tempo necessario a evadere la tua richiesta e fino a 24 mesi successivi. Gli iscritti alla newsletter restano in lista finché non si disiscrivono.</p>
                    ),
                },
                {
                    heading: 'I tuoi diritti',
                    body: (
                        <p>Puoi richiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione o portabilità dei tuoi dati, oltre a opporti al trattamento. Scrivici a <a href="mailto:hello@eeyaay.com" className="underline hover:text-black">hello@eeyaay.com</a>.</p>
                    ),
                },
                {
                    heading: 'Modifiche a questa policy',
                    body: (
                        <p>Possiamo aggiornare questa informativa in qualsiasi momento. La data in alto indica l’ultima revisione. Per modifiche sostanziali ti avviseremo via email o tramite un banner sul sito.</p>
                    ),
                },
            ]}
        />
    )
}
