export interface ServiceData {
    slug: string
    title: string
    headline: string
    intro: string
    blocks: { title: string; desc: string; points: string[]; imageColor: string }[]
    relatedSlugs: string[]
}

export const allServices: ServiceData[] = [
    {
        slug: 'ai-chatbots', title: 'Chatbot AI',
        headline: 'AI conversazionale che qualifica i lead e supporta i clienti 24/7',
        intro: 'Realizziamo chatbot intelligenti per siti web, WhatsApp e altri canali che gestiscono il supporto, qualificano i lead, prenotano appuntamenti e coinvolgono i clienti in ogni momento.',
        blocks: [
            {title: 'Distribuzione multicanale', desc: 'Distribuisci chatbot su siti web, WhatsApp, Messenger e piattaforme personalizzate con comportamento e branding coerenti.', points: ['Widget di live chat per siti web', 'Bot tramite WhatsApp Business API', 'Integrazione con Facebook Messenger', 'API per canali personalizzati'], imageColor: '#1a1a2e'},
            {title: 'Qualificazione e smistamento dei lead', desc: 'Qualifica automaticamente i lead in base a criteri personalizzati e indirizzali al membro del team o alla pipeline CRM più adatta.', points: ['Flussi di qualificazione personalizzati', 'Sincronizzazione automatica con CRM', 'Punteggio intelligente dei lead', 'Regole di smistamento del team'], imageColor: '#16213e'},
            {title: 'Comprensione del linguaggio naturale', desc: 'I nostri chatbot comprendono il contesto, gestiscono richieste complesse e mantengono conversazioni naturali che sembrano umane.', points: ['Riconoscimento dell\'intento', 'Memoria del contesto', 'Supporto multilingua', 'Rilevamento del sentiment'], imageColor: '#0f3460'},
            {title: 'Analisi e ottimizzazione', desc: 'Monitora ogni conversazione, identifica i punti di abbandono e migliora continuamente le prestazioni.', points: ['Analisi delle conversazioni', 'Dashboard delle performance', 'Test A/B dei flussi', 'Miglioramento continuo'], imageColor: '#1a1a2e'},
        ],
        relatedSlugs: ['ai-voice-agents', 'rag-knowledge-ai', 'custom-gpts', 'crm-erp-integration', 'email-automation'],
    },
    {
        slug: 'ai-voice-agents', title: 'Agenti Vocali AI',
        headline: 'AI vocale per chiamate in entrata e in uscita che non dorme mai',
        intro: 'Creiamo soluzioni di AI vocale per l\'automazione telefonica, lo smistamento delle chiamate e il servizio clienti vocale che gestiscono le telefonate con conversazioni naturali e simili a quelle umane.',
        blocks: [
            {title: 'Gestione delle chiamate in entrata', desc: 'Rispondi istantaneamente a ogni chiamata con un agente AI che comprende l\'intento del chiamante e risolve i problemi o smista in modo appropriato.', points: ['Risposta alle chiamate 24/7', 'Smistamento basato sull\'intento', 'Risoluzione delle FAQ', 'Prenotazione appuntamenti'], imageColor: '#2d1b69'},
            {title: 'Campagne in uscita', desc: 'Scala il tuo outreach con agenti AI che effettuano chiamate, seguono gli script in modo naturale e gestiscono le obiezioni.', points: ['Outreach automatizzato', 'Scripting dinamico', 'Gestione delle obiezioni', 'Analisi delle campagne'], imageColor: '#1b1b3a'},
            {title: 'Sintesi e riconoscimento vocale', desc: 'Voci dal suono naturale con riconoscimento vocale preciso tra accenti e lingue diverse.', points: ['Clonazione vocale personalizzata', 'Riconoscimento multi-accento', 'Trascrizione in tempo reale', 'Gestione del rumore'], imageColor: '#0d0d2b'},
            {title: 'Integrazione telefonica', desc: 'Collegati ai tuoi sistemi telefonici esistenti, CRM e strumenti aziendali in modo fluido.', points: ['Integrazione SIP/VoIP', 'Sincronizzazione CRM', 'Registrazione delle chiamate', 'Dashboard di analisi'], imageColor: '#1a0a2e'},
        ],
        relatedSlugs: ['ai-chatbots', 'rag-knowledge-ai', 'crm-erp-integration', 'rpa-automation', 'custom-gpts'],
    },
    {
        slug: 'rag-knowledge-ai', title: 'AI Basata sulla Conoscenza',
        headline: 'AI fondata sui tuoi dati reali, non su supposizioni',
        intro: 'Realizziamo sistemi AI collegati ai documenti e alle basi di conoscenza della tua azienda, così le risposte sono sempre accurate, verificabili e affidabili.',
        blocks: [
            {title: 'Acquisizione dei documenti', desc: 'Collega PDF, documenti, database, wiki e qualsiasi fonte di conoscenza in un indice unificato ricercabile dall\'AI.', points: ['Analisi di documenti in più formati', 'Connettori per database', 'Sincronizzazione con wiki e Confluence', 'Aggiornamenti in tempo reale'], imageColor: '#1a2e1a'},
            {title: 'Generazione aumentata dal recupero', desc: 'Combina potenti LLM con il recupero preciso dei documenti per ottenere risposte che citano le proprie fonti.', points: ['Indicizzazione con ricerca vettoriale', 'Suddivisione semantica', 'Citazione delle fonti', 'Prevenzione delle allucinazioni'], imageColor: '#0f3d0f'},
            {title: 'Assistenti di conoscenza personalizzati', desc: 'Distribuisci assistenti addestrati sui tuoi dati specifici per team interni o utilizzo rivolto ai clienti.', points: ['Help desk interni', 'Bot per il supporto clienti', 'Assistenti per l\'onboarding', 'Sistemi di Q&A sulle policy'], imageColor: '#1a3a1a'},
            {title: 'Sicurezza e conformità', desc: 'Sicurezza di livello enterprise con controlli di accesso, log di audit e conformità alla privacy dei dati.', points: ['Accesso basato sui ruoli', 'Registrazione degli audit', 'Crittografia dei dati', 'Conformità GDPR'], imageColor: '#0a2e0a'},
        ],
        relatedSlugs: ['ai-chatbots', 'custom-gpts', 'ai-voice-agents', 'bi-machine-learning', 'ai-training'],
    },
    {
        slug: 'custom-gpts', title: 'GPT Personalizzati',
        headline: 'Assistenti AI specializzati costruiti per il tuo flusso di lavoro specifico',
        intro: 'Progettiamo assistenti AI su misura per la tua azienda, il tuo ruolo o il tuo flusso di lavoro — con comportamento personalizzato, prompt ed esperienza nel dominio.',
        blocks: [
            {title: 'Addestramento specifico per il business', desc: 'Configuriamo assistenti AI con una profonda conoscenza del tuo settore, dei tuoi prodotti e dei tuoi processi.', points: ['Ottimizzazione dell\'expertise nel dominio', 'Allineamento alla voce del brand', 'Base di conoscenza del prodotto', 'Documentazione dei processi'], imageColor: '#2e1a1a'},
            {title: 'Integrazione nel flusso di lavoro', desc: 'Incorpora gli assistenti AI direttamente nei tuoi strumenti e flussi di lavoro esistenti.', points: ['Bot per Slack e Teams', 'Estensioni per browser', 'Integrazioni API', 'Interfacce personalizzate'], imageColor: '#3d0f0f'},
            {title: 'Prompt engineering', desc: 'Progettazione esperta dei prompt che garantisce output coerenti e di alta qualità per i tuoi casi d\'uso specifici.', points: ['Progettazione del system prompt', 'Formattazione dell\'output', 'Guard rail e sicurezza', 'Esempi few-shot'], imageColor: '#1a0a0a'},
            {title: 'Distribuzione e gestione', desc: 'Distribuisci su più piattaforme con monitoraggio, versioning e miglioramento continuo.', points: ['Distribuzione multi-piattaforma', 'Controllo delle versioni', 'Analisi dell\'utilizzo', 'Perfezionamento iterativo'], imageColor: '#2e0a1a'},
        ],
        relatedSlugs: ['rag-knowledge-ai', 'white-label-ai', 'ai-chatbots', 'ai-training', 'ai-voice-agents'],
    },
    {
        slug: 'white-label-ai', title: 'AI White-Label',
        headline: 'Piattaforme AI brandizzate che puoi rivendere come tue',
        intro: 'Sviluppiamo piattaforme AI che agenzie e aziende possono rebrandizzare e rivendere come propri prodotti SaaS.',
        blocks: [
            {title: 'Sviluppo della piattaforma', desc: 'Piattaforma AI full-stack con il tuo branding, dominio e opzioni di personalizzazione.', points: ['Branding personalizzato', 'Architettura multi-tenant', 'Dashboard amministrative', 'Gestione degli utenti'], imageColor: '#1a1a3e'},
            {title: 'Configurazione del motore AI', desc: 'Scegli e configura le funzionalità AI di cui i tuoi clienti hanno bisogno.', points: ['Costruttore di chatbot', 'Configurazione agenti vocali', 'Configurazione RAG', 'Modelli personalizzati'], imageColor: '#0f0f3e'},
            {title: 'Fatturazione e abbonamenti', desc: 'Gestione degli abbonamenti integrata per monetizzare immediatamente.', points: ['Integrazione Stripe', 'Prezzi basati sull\'utilizzo', 'Gestione dei piani', 'Automazione delle fatture'], imageColor: '#1a0a3e'},
            {title: 'Scalabilità e supporto', desc: 'Infrastruttura che si scala con la tua base di clienti, più supporto continuativo.', points: ['Infrastruttura auto-scalante', 'Gestione dei rate limit API', 'Onboarding personalizzato', 'Manutenzione continuativa'], imageColor: '#0a0a2e'},
        ],
        relatedSlugs: ['custom-gpts', 'ai-chatbots', 'gohighlevel', 'web-development', 'crm-erp-integration'],
    },
    {
        slug: 'rpa-automation', title: 'Automazione RPA',
        headline: 'Elimina il lavoro ripetitivo con l\'automazione intelligente dei processi',
        intro: 'Automatizziamo le attività aziendali ripetitive, riduciamo il lavoro manuale e miglioriamo l\'efficienza operativa attraverso software bot e progettazione dei flussi di lavoro.',
        blocks: [
            {title: 'Mappatura dei processi', desc: 'Identifichiamo e mappiamo ogni processo manuale che può essere automatizzato per massimizzare il ROI.', points: ['Analisi del flusso di lavoro', 'Identificazione dei colli di bottiglia', 'Calcolo del ROI', 'Classificazione delle priorità'], imageColor: '#2e2e1a'},
            {title: 'Sviluppo dei bot', desc: 'Bot software personalizzati che gestiscono l\'inserimento dati, l\'elaborazione dei file, le notifiche e altro ancora.', points: ['Bot per l\'estrazione dei dati', 'Automazione della compilazione di moduli', 'Generazione di report', 'Elaborazione delle email'], imageColor: '#3d3d0f'},
            {title: 'Orchestrazione del flusso di lavoro', desc: 'Collega più passaggi automatizzati in flussi di lavoro end-to-end con gestione degli errori.', points: ['Flussi di lavoro multi-step', 'Logica condizionale', 'Ripristino degli errori', 'Pianificazione'], imageColor: '#1a1a0a'},
            {title: 'Monitoraggio e manutenzione', desc: 'Il monitoraggio in tempo reale garantisce che le tue automazioni funzionino senza problemi in ogni momento.', points: ['Dashboard di stato', 'Sistemi di allerta', 'Metriche di performance', 'Ottimizzazione continua'], imageColor: '#2e2e0a'},
        ],
        relatedSlugs: ['crm-erp-integration', 'email-automation', 'gohighlevel', 'ai-chatbots', 'bi-machine-learning'],
    },
    {
        slug: 'crm-erp-integration', title: 'Integrazione CRM & ERP',
        headline: 'Collega i tuoi sistemi in un unico flusso aziendale continuo',
        intro: 'Implementiamo e colleghiamo piattaforme CRM, ERP, vendite, marketing e servizi affinché la tua azienda operi da un unico flusso di dati connesso.',
        blocks: [
            {title: 'Audit di sistema e pianificazione', desc: 'Analizziamo il tuo stack tecnologico attuale e progettiamo l\'architettura di integrazione ottimale.', points: ['Audit dello stack tecnologico', 'Mappatura del flusso di dati', 'Architettura di integrazione', 'Pianificazione della migrazione'], imageColor: '#1a2e2e'},
            {title: 'Implementazione CRM', desc: 'Configura e personalizza le piattaforme CRM per adattarle esattamente ai tuoi processi di vendita e assistenza.', points: ['HubSpot / Salesforce', 'Personalizzazione della pipeline', 'Gestione dei contatti', 'Regole di automazione'], imageColor: '#0f3d3d'},
            {title: 'Integrazione API e dati', desc: 'Collega sistemi disparati con una sincronizzazione dei dati affidabile e in tempo reale.', points: ['API REST / GraphQL', 'Configurazione dei webhook', 'Sincronizzazione in tempo reale', 'Trasformazione dei dati'], imageColor: '#0a2e2e'},
            {title: 'Formazione e supporto', desc: 'Assicurati che il tuo team possa sfruttare appieno i sistemi integrati.', points: ['Formazione del personale', 'Documentazione', 'Supporto continuativo', 'Revisioni di ottimizzazione'], imageColor: '#1a3d3d'},
        ],
        relatedSlugs: ['rpa-automation', 'email-automation', 'gohighlevel', 'bi-machine-learning', 'web-development'],
    },
    {
        slug: 'gohighlevel', title: 'GoHighLevel',
        headline: 'Lancia e scala piattaforme di marketing automation brandizzate',
        intro: 'Aiutiamo le agenzie a lanciare e scalare piattaforme di marketing automation brandizzate utilizzando le soluzioni white-label di GoHighLevel.',
        blocks: [
            {title: 'Configurazione della piattaforma', desc: 'Configurazione completa di GoHighLevel con il tuo branding, domini e flussi di lavoro.', points: ['Branding white-label', 'Configurazione dei domini', 'Configurazione dei sub-account', 'Libreria di template'], imageColor: '#2e1a2e'},
            {title: 'Creazione di funnel e automazioni', desc: 'Costruisci funnel ad alta conversione, sequenze email e campagne SMS.', points: ['Funnel di landing page', 'Sequenze email', 'Campagne SMS', 'Prenotazione appuntamenti'], imageColor: '#3d0f3d'},
            {title: 'Onboarding dei clienti', desc: 'Processi ottimizzati per integrare i clienti della tua agenzia in modo rapido e professionale.', points: ['Template di onboarding', 'Dashboard dei clienti', 'Gestione dei permessi', 'Materiali formativi'], imageColor: '#1a0a1a'},
            {title: 'Scaling delle operazioni', desc: 'Sistemi e processi per scalare la tua agenzia da 10 a oltre 1000 clienti.', points: ['Template snapshot', 'Provisioning automatizzato', 'Flussi di lavoro per il supporto', 'Monitoraggio dei ricavi'], imageColor: '#2e0a2e'},
        ],
        relatedSlugs: ['email-automation', 'crm-erp-integration', 'white-label-ai', 'seo', 'web-development'],
    },
    {
        slug: 'email-automation', title: 'Email Marketing',
        headline: 'Sistemi email che generano coinvolgimento e ricavi in automatico',
        intro: 'Creiamo sistemi email, campagne, automazioni e configurazioni di deliverability che generano coinvolgimento e ricavi.',
        blocks: [
            {title: 'Strategia e pianificazione', desc: 'Strategie email basate sui dati, allineate al percorso del cliente e agli obiettivi aziendali.', points: ['Segmentazione del pubblico', 'Mappatura del percorso', 'Calendario dei contenuti', 'Framework KPI'], imageColor: '#2e2e1a'},
            {title: 'Flussi di automazione', desc: 'Sequenze email basate su trigger che nutrono i lead e fidelizzano i clienti in automatico.', points: ['Sequenze di benvenuto', 'Flussi per carrello abbandonato', 'Campagne di re-engagement', 'Nurturing post-acquisto'], imageColor: '#3d3d0f'},
            {title: 'Template e contenuti', desc: 'Template email curati e responsive con testi che convertono.', points: ['Template responsive', 'Contenuti dinamici', 'Test A/B', 'Personalizzazione'], imageColor: '#1a1a0a'},
            {title: 'Deliverability', desc: 'Assicurati che le tue email arrivino nella casella di posta, non nello spam, con autenticazione corretta e warm-up.', points: ['Configurazione SPF/DKIM/DMARC', 'Warm-up degli IP', 'Igiene delle liste', 'Test di posizionamento in posta in arrivo'], imageColor: '#2e2e0a'},
        ],
        relatedSlugs: ['crm-erp-integration', 'gohighlevel', 'rpa-automation', 'ai-chatbots', 'seo'],
    },
    {
        slug: 'web-development', title: 'Sviluppo Web',
        headline: 'Crea storie interessanti con uno sviluppo web creativo',
        intro: 'Realizziamo siti web, portali e applicazioni web moderni e ad alte prestazioni, allineati ai tuoi obiettivi aziendali e progettati per convertire.',
        blocks: [
            {title: 'Sviluppo web completo', desc: 'Dal concept alla distribuzione, gestiamo ogni aspetto dello sviluppo web con eccellenza tecnica.', points: ['Design sito web personalizzato', 'Build responsive mobile-first', 'Ottimizzazione delle performance', 'Integrazione CMS'], imageColor: '#c4442a'},
            {title: 'Sviluppo applicazioni', desc: 'Realizziamo applicazioni web che risolvono problemi aziendali reali e semplificano le operazioni.', points: ['Sviluppo full-stack', 'Progettazione e integrazione API', 'Dashboard in tempo reale', 'Autenticazione e sicurezza'], imageColor: '#e87830'},
            {title: 'Ottimizzazione delle performance', desc: 'Tempi di caricamento fulminei, migliori posizionamenti nei motori di ricerca e migliore esperienza utente.', points: ['Core Web Vitals', 'Ottimizzazione delle immagini', 'SSR e caching', 'Distribuzione CDN'], imageColor: '#2563eb'},
            {title: 'Piattaforme e-commerce', desc: 'Negozi online focalizzati sulla conversione, UX e crescita dei ricavi.', points: ['E-commerce personalizzato', 'Integrazione dei pagamenti', 'Gestione dell\'inventario', 'CRO'], imageColor: '#7c3aed'},
        ],
        relatedSlugs: ['seo', 'ecommerce', 'crm-erp-integration', 'ai-chatbots', 'email-automation'],
    },
    {
        slug: 'seo', title: 'SEO & SEO Locale',
        headline: 'Fatti trovare dai clienti che cercano attivamente ciò che offri',
        intro: 'Aiutiamo le aziende a migliorare la visibilità nella ricerca Google e nei risultati delle mappe locali attraverso SEO tecnica, strategia dei contenuti e ottimizzazione del profilo Google Business.',
        blocks: [
            {title: 'SEO tecnica', desc: 'Correggi le fondamenta affinché i motori di ricerca possano scansionare, indicizzare e posizionare correttamente il tuo sito.', points: ['Audit dell\'architettura del sito', 'Ottimizzazione della velocità', 'Schema markup', 'Correzione degli errori di scansione'], imageColor: '#1a2e1a'},
            {title: 'Strategia dei contenuti', desc: 'Crea contenuti che si posizionano, generano traffico e convertono i visitatori in lead.', points: ['Ricerca delle parole chiave', 'Pianificazione dei contenuti', 'Blog e landing page', 'Ottimizzazione dei contenuti'], imageColor: '#0f3d0f'},
            {title: 'SEO Locale', desc: 'Domina i risultati di ricerca locali e Google Maps per la tua area di servizio.', points: ['Profilo Google Business', 'Citazioni locali', 'Gestione delle recensioni', 'Contenuti locali'], imageColor: '#1a3a1a'},
            {title: 'Reportistica e crescita', desc: 'Monitora posizionamenti, traffico e conversioni con report chiari e pratici.', points: ['Monitoraggio del posizionamento', 'Analisi del traffico', 'Monitoraggio delle conversioni', 'Report mensili'], imageColor: '#0a2e0a'},
        ],
        relatedSlugs: ['web-development', 'ecommerce', 'email-automation', 'ai-chatbots', 'bi-machine-learning'],
    },
    {
        slug: 'ecommerce', title: 'E-commerce',
        headline: 'Negozi online progettati per trasformare i visitatori in acquirenti',
        intro: 'Progettiamo e ottimizziamo negozi online focalizzati sulla conversione, l\'esperienza utente e una crescita sostenibile dei ricavi.',
        blocks: [
            {title: 'Sviluppo del negozio', desc: 'Build e-commerce personalizzate su Shopify, WooCommerce o piattaforme headless.', points: ['Selezione della piattaforma', 'Sviluppo di tema personalizzato', 'Configurazione dei prodotti', 'Supporto multi-valuta'], imageColor: '#2e1a1a'},
            {title: 'Ottimizzazione della conversione', desc: 'Ogni elemento progettato per ridurre le frizioni e aumentare gli acquisti.', points: ['Ottimizzazione del checkout', 'Design delle pagine prodotto', 'Segnali di fiducia', 'Upsell/cross-sell'], imageColor: '#3d0f0f'},
            {title: 'Pagamenti e logistica', desc: 'Elaborazione dei pagamenti e integrazioni di spedizione senza interruzioni.', points: ['Gateway di pagamento', 'Calcolatori di spedizione', 'Sincronizzazione inventario', 'Gestione degli ordini'], imageColor: '#1a0a0a'},
            {title: 'Crescita e marketing', desc: 'Genera traffico e acquisti ripetuti con strumenti di marketing integrati.', points: ['Email marketing', 'Recupero del carrello abbandonato', 'Programmi fedeltà', 'Analisi'], imageColor: '#2e0a1a'},
        ],
        relatedSlugs: ['web-development', 'seo', 'email-automation', 'ai-chatbots', 'crm-erp-integration'],
    },
    {
        slug: 'bi-machine-learning', title: 'ML, BI & Dati',
        headline: 'Trasforma i dati grezzi in dashboard, modelli e decisioni aziendali',
        intro: 'Aiutiamo le aziende a trasformare i dati in dashboard, previsioni, modelli e sistemi decisionali, costruendo al contempo l\'infrastruttura dati sottostante.',
        blocks: [
            {title: 'Infrastruttura dati', desc: 'Costruisci le pipeline e i data warehouse che rendono i tuoi dati utilizzabili e affidabili.', points: ['Pipeline ETL', 'Data warehousing', 'Configurazione data lake', 'Raccolta dati tramite API'], imageColor: '#1a1a2e'},
            {title: 'Dashboard BI', desc: 'Dashboard interattive che offrono al tuo team visibilità in tempo reale sulle performance aziendali.', points: ['Dashboard personalizzate', 'Metriche in tempo reale', 'Report automatizzati', 'Analisi drill-down'], imageColor: '#0f0f3e'},
            {title: 'Modelli di machine learning', desc: 'Modelli predittivi che prevedono tendenze, rilevano anomalie e ottimizzano le decisioni.', points: ['Previsione della domanda', 'Previsione del churn', 'Rilevamento delle anomalie', 'Motori di raccomandazione'], imageColor: '#1a0a3e'},
            {title: 'Strategia dei dati', desc: 'Allinea le tue capacità sui dati agli obiettivi aziendali per il massimo impatto.', points: ['Audit dei dati', 'Roadmap strategica', 'Abilitazione del team', 'Framework di governance'], imageColor: '#0a0a2e'},
        ],
        relatedSlugs: ['ai-training', 'rpa-automation', 'crm-erp-integration', 'custom-gpts', 'rag-knowledge-ai'],
    },
    {
        slug: 'ai-training', title: 'Formazione AI',
        headline: 'Forma i tuoi team all\'adozione degli strumenti AI e sviluppa competenze interne durature',
        intro: 'Formiamo i team per adottare correttamente gli strumenti AI, migliorarne l\'utilizzo e costruire una solida capacità AI interna in tutta l\'organizzazione.',
        blocks: [
            {title: 'Workshop di alfabetizzazione AI', desc: 'Formazione di base che aiuta ogni membro del team a comprendere e sfruttare l\'AI in modo efficace.', points: ['Fondamenti di AI', 'Presentazione degli strumenti', 'Esercizi pratici', 'Identificazione dei casi d\'uso'], imageColor: '#2e2e2e'},
            {title: 'Formazione su strumenti specifici', desc: 'Sessioni approfondite sugli strumenti AI specifici che il tuo team utilizza quotidianamente.', points: ['Padronanza di ChatGPT / Claude', 'Integrazione Copilot', 'Creazione di GPT personalizzati', 'Prompt engineering'], imageColor: '#1a1a1a'},
            {title: 'Strategia AI per i leader', desc: 'Aiuta la leadership a comprendere le opportunità dell\'AI e a prendere decisioni tecnologiche informate.', points: ['Mappatura delle opportunità AI', 'Framework ROI', 'Valutazione dei rischi', 'Pianificazione della roadmap'], imageColor: '#0a0a0a'},
            {title: 'Abilitazione continuativa', desc: 'Programmi di apprendimento continuo che mantengono il tuo team all\'avanguardia.', points: ['Workshop mensili', 'Revisione di nuovi strumenti', 'Aggiornamenti sulle best practice', 'Champion AI interni'], imageColor: '#2e2e1a'},
        ],
        relatedSlugs: ['custom-gpts', 'rag-knowledge-ai', 'bi-machine-learning', 'ai-chatbots', 'rpa-automation'],
    },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return allServices.find(s => s.slug === slug)
}

export function getRelatedServices(slugs: string[]) {
    return slugs.map(s => allServices.find(svc => svc.slug === s)).filter(Boolean) as ServiceData[]
}
