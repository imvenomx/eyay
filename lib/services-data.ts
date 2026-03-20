export interface FaqItem { q: string; a: string }

export interface ServiceData {
    slug: string
    title: string
    headline: string
    intro: string
    blocks: { title: string; desc: string; points: string[]; imageColor: string }[]
    relatedSlugs: string[]
    faq?: FaqItem[]
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
        faq: [
            {q: 'Quanto tempo serve per implementare un chatbot AI?', a: 'Generalmente tra 2 e 6 settimane, a seconda della complessità e delle integrazioni richieste.'},
            {q: 'Il chatbot può essere integrato con il mio CRM?', a: 'Sì, integriamo il chatbot con i principali CRM come HubSpot e Salesforce per sincronizzare i lead in tempo reale.'},
            {q: 'Il chatbot supporta più lingue?', a: 'Sì, i nostri chatbot supportano più lingue incluso l\'italiano, l\'inglese e molte altre.'},
            {q: 'Posso personalizzare l\'aspetto e il tono del chatbot?', a: 'Assolutamente, il chatbot viene configurato con il branding e la voce del tuo brand per un\'esperienza coerente.'},
            {q: 'Come vengono gestite le conversazioni che il chatbot non riesce a risolvere?', a: 'Il chatbot smista automaticamente le conversazioni complesse a un operatore umano tramite regole di escalation personalizzabili.'},
        ],
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
        faq: [
            {q: 'Gli agenti vocali AI suonano come esseri umani?', a: 'Sì, utilizziamo tecnologie di sintesi vocale avanzate che producono voci naturali e difficilmente distinguibili da quelle umane.'},
            {q: 'L\'agente vocale può gestire più chiamate contemporaneamente?', a: 'Sì, la piattaforma scala automaticamente per gestire migliaia di chiamate in parallelo senza limitazioni.'},
            {q: 'È possibile integrare l\'agente vocale con il mio sistema telefonico esistente?', a: 'Sì, supportiamo l\'integrazione con sistemi SIP/VoIP e le principali piattaforme telefoniche aziendali.'},
            {q: 'Quanto tempo richiede la configurazione di un agente vocale?', a: 'La maggior parte dei progetti viene completata in 3-5 settimane, inclusi test e ottimizzazione degli script.'},
            {q: 'Le chiamate vengono registrate e trascritte?', a: 'Sì, ogni chiamata viene registrata e trascritta automaticamente per analisi, conformità e miglioramento continuo.'},
        ],
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
        faq: [
            {q: 'Che differenza c\'è tra un sistema RAG e un chatbot tradizionale?', a: 'Un sistema RAG recupera informazioni direttamente dai tuoi documenti prima di rispondere, garantendo risposte accurate e verificabili invece di affidarsi solo alla memoria del modello.'},
            {q: 'Quali tipi di documenti possono essere indicizzati?', a: 'Supportiamo PDF, Word, Excel, pagine web, database e wiki aziendali come Confluence e Notion.'},
            {q: 'I dati aziendali rimangono privati?', a: 'Sì, i tuoi documenti vengono elaborati e archiviati in ambienti sicuri con crittografia e controlli di accesso basati sui ruoli.'},
            {q: 'Con quale frequenza vengono aggiornati i contenuti indicizzati?', a: 'I contenuti possono essere aggiornati in tempo reale o secondo una pianificazione, a seconda della fonte e della configurazione scelta.'},
            {q: 'Il sistema può citare le fonti nelle risposte?', a: 'Sì, ogni risposta può includere i riferimenti ai documenti originali da cui è stata estratta l\'informazione.'},
        ],
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
        faq: [
            {q: 'Cosa rende un GPT personalizzato diverso da ChatGPT standard?', a: 'Un GPT personalizzato è configurato con istruzioni, conoscenze e vincoli specifici per la tua azienda, garantendo risposte sempre pertinenti al tuo contesto.'},
            {q: 'Posso integrare il GPT personalizzato in Slack o Microsoft Teams?', a: 'Sì, realizziamo integrazioni native per Slack, Teams e altri strumenti di collaborazione aziendali.'},
            {q: 'Il GPT può accedere a dati aggiornati dalla mia azienda?', a: 'Sì, tramite integrazione API o sistemi RAG il GPT può accedere a dati aziendali in tempo reale.'},
            {q: 'Come viene garantita la sicurezza delle informazioni sensibili?', a: 'Implementiamo guardrail e istruzioni di sistema per impedire la divulgazione di informazioni riservate o risposte fuori contesto.'},
            {q: 'Quanto tempo richiede lo sviluppo di un GPT personalizzato?', a: 'Un GPT base può essere pronto in 1-2 settimane; versioni più avanzate con integrazioni richiedono 3-6 settimane.'},
        ],
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
        faq: [
            {q: 'Posso rivendere la piattaforma AI con il mio brand senza menzionare la tecnologia sottostante?', a: 'Sì, la soluzione white-label è completamente brandizzata con il tuo nome, logo e dominio, senza riferimenti alla nostra tecnologia.'},
            {q: 'La piattaforma supporta più clienti separati?', a: 'Sì, l\'architettura multi-tenant garantisce che ogni cliente abbia un ambiente isolato e sicuro.'},
            {q: 'È inclusa la gestione dei pagamenti e degli abbonamenti?', a: 'Sì, integriamo Stripe per la gestione completa di abbonamenti, fatturazione e pagamenti ricorrenti.'},
            {q: 'Cosa succede se il numero di clienti cresce rapidamente?', a: 'L\'infrastruttura scala automaticamente per supportare la crescita senza interruzioni del servizio.'},
            {q: 'È possibile aggiungere funzionalità AI specifiche per i miei clienti?', a: 'Sì, la piattaforma è modulare e possiamo aggiungere o configurare le funzionalità AI in base alle esigenze del tuo mercato.'},
        ],
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
        faq: [
            {q: 'Quali processi aziendali si prestano meglio all\'automazione RPA?', a: 'I candidati ideali sono attività ripetitive basate su regole come inserimento dati, generazione report, elaborazione fatture e invio notifiche.'},
            {q: 'L\'automazione RPA richiede modifiche ai sistemi esistenti?', a: 'No, i bot RPA interagiscono con le applicazioni esistenti tramite l\'interfaccia utente o le API, senza necessità di modifiche ai sistemi.'},
            {q: 'Quanto risparmio posso aspettarmi con l\'automazione RPA?', a: 'Le aziende tipicamente riducono i tempi operativi del 40-80% per i processi automatizzati, con un ROI spesso raggiunto entro 6-12 mesi.'},
            {q: 'Cosa succede se un bot RPA incontra un errore?', a: 'Ogni bot include logica di gestione degli errori e sistemi di allerta che notificano il team in caso di problemi, garantendo continuità operativa.'},
            {q: 'I bot RPA sono sicuri?', a: 'Sì, implementiamo controlli di accesso, log di audit e crittografia per garantire che i bot operino in modo sicuro e conforme.'},
        ],
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
        faq: [
            {q: 'Quali CRM supportate per l\'implementazione e l\'integrazione?', a: 'Lavoriamo principalmente con HubSpot e Salesforce, ma supportiamo anche Pipedrive, Zoho e altre piattaforme CRM diffuse.'},
            {q: 'Quanto tempo richiede un\'integrazione tra CRM ed ERP?', a: 'Un\'integrazione standard richiede tipicamente 4-8 settimane, a seconda della complessità dei sistemi e del volume di dati.'},
            {q: 'I dati esistenti vengono migrati durante l\'integrazione?', a: 'Sì, gestiamo la migrazione e la pulizia dei dati esistenti per garantire continuità operativa senza perdita di informazioni.'},
            {q: 'La sincronizzazione dei dati avviene in tempo reale?', a: 'Sì, configuriamo webhook e API per garantire la sincronizzazione in tempo reale tra i sistemi connessi.'},
            {q: 'Il mio team riceverà formazione sull\'uso dei sistemi integrati?', a: 'Sì, includiamo sessioni di formazione personalizzate e documentazione completa per garantire che il team sfrutti appieno le nuove integrazioni.'},
        ],
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
        faq: [
            {q: 'GoHighLevel è adatto anche per agenzie piccole o appena nate?', a: 'Sì, la piattaforma è scalabile e adatta anche alle agenzie che stanno muovendo i primi passi, con costi che crescono insieme al business.'},
            {q: 'Posso usare GoHighLevel con il mio dominio personalizzato?', a: 'Sì, configuriamo GoHighLevel con il tuo dominio e branding personalizzato in modo che i clienti vedano solo il tuo marchio.'},
            {q: 'È possibile automatizzare l\'onboarding di nuovi clienti su GoHighLevel?', a: 'Sì, creiamo snapshot e flussi automatizzati che riducono drasticamente il tempo necessario per aggiungere nuovi clienti alla piattaforma.'},
            {q: 'GoHighLevel supporta campagne SMS oltre alle email?', a: 'Sì, la piattaforma include funzionalità native per campagne SMS, email, chiamate e messaggi vocali automatizzati.'},
            {q: 'Offrite supporto continuativo dopo la configurazione di GoHighLevel?', a: 'Sì, forniamo supporto e ottimizzazione continuativi per garantire che la piattaforma cresca con le esigenze della tua agenzia.'},
        ],
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
        faq: [
            {q: 'Come posso migliorare la deliverability delle mie email?', a: 'Configuriamo SPF, DKIM e DMARC correttamente e gestiamo il warm-up degli indirizzi IP per massimizzare il tasso di recapito in posta in arrivo.'},
            {q: 'Quali piattaforme di email marketing supportate?', a: 'Lavoriamo con le principali piattaforme tra cui Mailchimp, Klaviyo, ActiveCampaign, HubSpot e GoHighLevel.'},
            {q: 'Quanto tempo ci vuole per costruire un\'automazione email completa?', a: 'Una sequenza di automazione base richiede 1-2 settimane; sistemi più articolati con segmentazione avanzata possono richiedere 3-5 settimane.'},
            {q: 'Come si misura il successo di una campagna email?', a: 'Monitoriamo aperture, click, conversioni e ricavi generati con report periodici chiari e raccomandazioni di ottimizzazione.'},
            {q: 'Posso personalizzare le email in base al comportamento degli utenti?', a: 'Sì, implementiamo segmentazione dinamica e trigger comportamentali per inviare il messaggio giusto alla persona giusta nel momento più opportuno.'},
        ],
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
        faq: [
            {q: 'Quanto tempo richiede la realizzazione di un sito web professionale?', a: 'Un sito aziendale standard richiede tipicamente 4-8 settimane, dalla fase di design alla pubblicazione finale.'},
            {q: 'Il sito sarà ottimizzato per i dispositivi mobili?', a: 'Sì, tutti i siti che realizziamo seguono un approccio mobile-first e sono completamente responsive su ogni dispositivo.'},
            {q: 'Posso gestire autonomamente i contenuti del sito dopo la consegna?', a: 'Sì, integriamo un CMS intuitivo e forniamo formazione per permetterti di aggiornare i contenuti in completa autonomia.'},
            {q: 'Quali tecnologie utilizzate per lo sviluppo web?', a: 'Lavoriamo principalmente con Next.js, React, TypeScript e le principali piattaforme CMS come Sanity, WordPress e Webflow.'},
            {q: 'Il sito includerà ottimizzazioni per la velocità di caricamento?', a: 'Sì, ottimizziamo i Core Web Vitals, le immagini e il caching per garantire tempi di caricamento rapidi e migliori posizionamenti SEO.'},
        ],
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
        faq: [
            {q: 'Quanto tempo ci vuole per vedere i primi risultati SEO?', a: 'Generalmente si iniziano a vedere miglioramenti significativi nei posizionamenti entro 3-6 mesi dall\'inizio del lavoro SEO.'},
            {q: 'La SEO locale è diversa dalla SEO tradizionale?', a: 'Sì, la SEO locale si concentra su ricerche geografiche, ottimizzazione del profilo Google Business e citazioni locali per attrarre clienti nella tua area.'},
            {q: 'Come scegliete le parole chiave su cui lavorare?', a: 'Conduciamo una ricerca approfondita analizzando volume di ricerca, concorrenza e intento dell\'utente per identificare le keyword con il miglior potenziale.'},
            {q: 'Posso vedere report sull\'andamento del mio posizionamento?', a: 'Sì, forniamo report mensili dettagliati su posizionamenti, traffico organico e conversioni con analisi e raccomandazioni pratiche.'},
            {q: 'La SEO include anche la creazione di contenuti?', a: 'Sì, la nostra strategia include la pianificazione e la creazione di articoli, landing page e contenuti ottimizzati per i motori di ricerca.'},
        ],
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
        faq: [
            {q: 'Quale piattaforma e-commerce consigliate per iniziare?', a: 'Per la maggior parte delle aziende consigliamo Shopify per la sua facilità d\'uso; per esigenze più avanzate valutiamo WooCommerce o soluzioni headless personalizzate.'},
            {q: 'Quali gateway di pagamento vengono integrati?', a: 'Integriamo i principali gateway come Stripe, PayPal, Nexi e Satispay, con supporto per pagamenti locali e internazionali.'},
            {q: 'Come si gestisce il recupero dei carrelli abbandonati?', a: 'Implementiamo sequenze email automatizzate e notifiche push per recuperare i clienti che hanno abbandonato il carrello, aumentando significativamente il tasso di conversione.'},
            {q: 'Il negozio online può gestire un catalogo con migliaia di prodotti?', a: 'Sì, ottimizziamo la struttura del catalogo, le performance e la ricerca per gestire grandi cataloghi senza compromettere l\'esperienza utente.'},
            {q: 'È possibile vendere sia in Italia che all\'estero?', a: 'Sì, configuriamo il negozio con supporto multi-valuta, multi-lingua e opzioni di spedizione internazionale per espandere le vendite oltre confine.'},
        ],
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
        faq: [
            {q: 'Quali strumenti BI utilizzate per la creazione di dashboard?', a: 'Lavoriamo con Power BI, Looker, Metabase e soluzioni custom in base alle esigenze e all\'ecosistema tecnologico del cliente.'},
            {q: 'Quanto tempo richiede la costruzione di un modello di machine learning?', a: 'Dipende dalla complessità: modelli predittivi standard richiedono 4-8 settimane, incluse la raccolta dati, il training e la validazione.'},
            {q: 'I miei dati devono essere già strutturati per iniziare?', a: 'No, gestiamo anche la pulizia e la strutturazione dei dati grezzi come parte del processo di costruzione dell\'infrastruttura dati.'},
            {q: 'Cosa può prevedere un modello di machine learning per la mia azienda?', a: 'I modelli più comuni prevedono la domanda di prodotti, il rischio di abbandono dei clienti, le anomalie operative e i ricavi futuri.'},
            {q: 'Le dashboard sono accessibili da mobile?', a: 'Sì, progettiamo le dashboard con un approccio responsive per garantire la leggibilità e l\'usabilità anche su smartphone e tablet.'},
        ],
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
        faq: [
            {q: 'La formazione AI è adatta anche a persone senza background tecnico?', a: 'Sì, i nostri workshop sono progettati per ogni livello di competenza, con un linguaggio accessibile e molti esempi pratici applicabili subito.'},
            {q: 'La formazione avviene in presenza o online?', a: 'Offriamo entrambe le modalità: sessioni online via videoconferenza e workshop in presenza presso la tua sede.'},
            {q: 'Quanto dura un programma di formazione AI tipico?', a: 'Un programma base si completa in 1-2 giornate; percorsi più approfonditi per team operativi possono essere distribuiti su più settimane.'},
            {q: 'I materiali formativi rimangono disponibili dopo i workshop?', a: 'Sì, forniamo materiali, guide pratiche e risorse digitali che il team può consultare anche dopo la formazione.'},
            {q: 'È possibile formare team di reparti diversi con contenuti personalizzati?', a: 'Sì, personalizziamo il percorso formativo per ogni reparto, adattando esempi e casi d\'uso al contesto specifico di ogni team.'},
        ],
    },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return allServices.find(s => s.slug === slug)
}

export function getRelatedServices(slugs: string[]) {
    return slugs.map(s => allServices.find(svc => svc.slug === s)).filter(Boolean) as ServiceData[]
}
