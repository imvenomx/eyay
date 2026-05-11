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
            it={{
                eyebrow: 'Legal // Terms',
                title: 'Termini & Condizioni',
                lastUpdated: '10 maggio 2026',
                intro: 'Questi termini regolano l’uso del sito eeyaay.it e dei servizi offerti da Eey Aay. Versione stub — accordi commerciali specifici saranno formalizzati in proposte e contratti separati.',
                sections: [
                    {heading: 'Accettazione', body: <p>Utilizzando il sito accetti integralmente questi termini. Se non sei d’accordo con anche solo una parte, ti invitiamo a non utilizzare il sito.</p>},
                    {heading: 'Servizi', body: <p>Eey Aay offre servizi di consulenza, sviluppo e implementazione in ambito AI, automazione e trasformazione digitale. Il dettaglio di ogni progetto — perimetro, tempi, costi — è oggetto di proposta scritta dedicata.</p>},
                    {heading: 'Proprietà intellettuale', body: <p>Tutti i contenuti del sito (testi, grafiche, codice, marchi) sono di proprietà di Eey Aay o dei rispettivi titolari. Non è consentita riproduzione totale o parziale senza autorizzazione scritta.</p>},
                    {heading: 'Limitazione di responsabilità', body: <p>I contenuti del sito hanno carattere informativo. Eey Aay non garantisce che le informazioni siano sempre aggiornate o complete e non risponde di eventuali danni derivanti dall’uso o dall’impossibilità di uso del sito.</p>},
                    {heading: 'Link esterni', body: <p>Il sito può contenere collegamenti a risorse di terzi. Eey Aay non controlla né si assume responsabilità per i contenuti di tali siti esterni.</p>},
                    {heading: 'Legge applicabile', body: <p>Questi termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il foro di residenza del titolare, salvo diversa disposizione di legge inderogabile.</p>},
                    {heading: 'Contatti', body: <p>Per qualsiasi domanda relativa a questi termini scrivici a <a href="mailto:support@eeyaay.it" className="underline hover:text-black">support@eeyaay.it</a>.</p>},
                ],
            }}
            en={{
                eyebrow: 'Legal // Terms',
                title: 'Terms & Conditions',
                lastUpdated: 'May 10, 2026',
                intro: 'These terms govern the use of eeyaay.it and the services offered by Eey Aay. Stub version — specific commercial agreements are formalized in separate proposals and contracts.',
                sections: [
                    {heading: 'Acceptance', body: <p>By using the site you fully accept these terms. If you disagree with any part of them, please do not use the site.</p>},
                    {heading: 'Services', body: <p>Eey Aay offers consulting, development and implementation services in AI, automation and digital transformation. Project specifics — scope, timeline, fees — are documented in a dedicated written proposal.</p>},
                    {heading: 'Intellectual property', body: <p>All site content (text, graphics, code, trademarks) is owned by Eey Aay or its respective rights holders. Full or partial reproduction is not allowed without written authorization.</p>},
                    {heading: 'Limitation of liability', body: <p>Site content is for informational purposes. Eey Aay does not guarantee that information is always up to date or complete and is not liable for damages arising from use or inability to use the site.</p>},
                    {heading: 'External links', body: <p>The site may include links to third-party resources. Eey Aay does not control and is not responsible for the content of such external sites.</p>},
                    {heading: 'Governing law', body: <p>These terms are governed by Italian law. Any dispute is subject to the courts of the owner&apos;s place of residence, unless mandatory law requires otherwise.</p>},
                    {heading: 'Contact', body: <p>For any question about these terms write to <a href="mailto:support@eeyaay.it" className="underline hover:text-black">support@eeyaay.it</a>.</p>},
                ],
            }}
        />
    )
}
