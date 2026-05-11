import type {Metadata} from 'next'
import LegalPage from '@/components/legal-page'

export const metadata: Metadata = {
    title: 'Termini & Condizioni — Eey Aay',
    description: 'Termini e condizioni d’uso del sito Eey Aay e dei servizi offerti.',
    robots: {index: true, follow: true},
    alternates: {canonical: '/terms'},
}

export default function TermsPage() {
    return (
        <LegalPage
            eyebrow="Legal // Terms"
            title="Termini & Condizioni"
            lastUpdated="10 maggio 2026"
            intro="Questi termini regolano l’uso del sito eeyaay.it e dei servizi offerti da Eey Aay. Versione stub — accordi commerciali specifici saranno formalizzati in proposte e contratti separati."
            sections={[
                {
                    heading: 'Accettazione',
                    body: (
                        <p>Utilizzando il sito accetti integralmente questi termini. Se non sei d’accordo con anche solo una parte, ti invitiamo a non utilizzare il sito.</p>
                    ),
                },
                {
                    heading: 'Servizi',
                    body: (
                        <p>Eey Aay offre servizi di consulenza, sviluppo e implementazione in ambito AI, automazione e trasformazione digitale. Il dettaglio di ogni progetto — perimetro, tempi, costi — è oggetto di proposta scritta dedicata.</p>
                    ),
                },
                {
                    heading: 'Proprietà intellettuale',
                    body: (
                        <p>Tutti i contenuti del sito (testi, grafiche, codice, marchi) sono di proprietà di Eey Aay o dei rispettivi titolari. Non è consentita riproduzione totale o parziale senza autorizzazione scritta.</p>
                    ),
                },
                {
                    heading: 'Limitazione di responsabilità',
                    body: (
                        <p>I contenuti del sito hanno carattere informativo. Eey Aay non garantisce che le informazioni siano sempre aggiornate o complete e non risponde di eventuali danni derivanti dall’uso o dall’impossibilità di uso del sito.</p>
                    ),
                },
                {
                    heading: 'Link esterni',
                    body: (
                        <p>Il sito può contenere collegamenti a risorse di terzi. Eey Aay non controlla né si assume responsabilità per i contenuti di tali siti esterni.</p>
                    ),
                },
                {
                    heading: 'Legge applicabile',
                    body: (
                        <p>Questi termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il foro di residenza del titolare, salvo diversa disposizione di legge inderogabile.</p>
                    ),
                },
                {
                    heading: 'Contatti',
                    body: (
                        <p>Per qualsiasi domanda relativa a questi termini scrivici a <a href="mailto:hello@eeyaay.com" className="underline hover:text-black">hello@eeyaay.com</a>.</p>
                    ),
                },
            ]}
        />
    )
}
