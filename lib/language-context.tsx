'use client'
import {createContext, useContext, useState, ReactNode, useCallback} from 'react'

type Lang = 'it' | 'en'

const LanguageContext = createContext<{
    lang: Lang
    setLang: (l: Lang) => void
    t: (key: string) => string
}>({lang: 'it', setLang: () => {}, t: (k) => k})

export const useLanguage = () => useContext(LanguageContext)

// ── All translations ──
const translations: Record<string, Record<Lang, string>> = {
    // Nav
    'nav.ask': {it: 'Chiedici qualsiasi cosa', en: 'Ask us anything'},
    'nav.menu': {it: 'Menu', en: 'Menu'},
    'nav.close': {it: 'Chiudi', en: 'Close'},

    // Hero
    'hero.t1.heading': {it: 'AI & Automazione\nper il Business Moderno', en: 'AI & Automation\nfor Modern Business'},
    'hero.t1.sub': {it: 'Eey Aay — Il tuo Partner AI', en: 'Eey Aay — Your AI Partner'},
    'hero.t2.heading': {it: 'Dai chatbot agli agenti vocali\nalla trasformazione digitale', en: 'From chatbots to voice agents\nto full digital transformation'},
    'hero.t2.sub': {it: 'Costruiamo sistemi che scalano', en: 'We build systems that scale'},
    'hero.t3.heading': {it: 'Risultati concreti\nnon solo tecnologia appariscente', en: 'Practical business outcomes\nnot just flashy tech'},
    'hero.t3.sub': {it: 'Risparmiare tempo · Ridurre i costi · Crescere', en: 'Save time · Reduce costs · Grow revenue'},
    'hero.scroll': {it: 'Scorri', en: 'Scroll'},

    // Services
    'services.label': {it: 'Servizi', en: 'Services'},
    'services.heading': {it: 'Aiutiamo le aziende ad automatizzare le operazioni e costruire sistemi AI che scalano.', en: 'We help companies automate operations and build AI-powered systems that scale.'},
    'services.desc': {it: 'Eey Aay aiuta le aziende a utilizzare AI e automazione in modi pratici e orientati ai ricavi. Costruiamo chatbot intelligenti, agenti vocali, sistemi AI basati sulla conoscenza, automazioni dei flussi di lavoro, integrazioni CRM, siti web e soluzioni dati che semplificano le operazioni e migliorano il coinvolgimento dei clienti.', en: 'Eey Aay helps businesses use AI and automation in practical, revenue-focused ways. We build intelligent chatbots, voice agents, knowledge-based AI systems, workflow automations, CRM integrations, websites, and data solutions that streamline operations and improve customer engagement.'},
    'services.cta': {it: 'INIZIA ORA', en: 'GET STARTED'},
    'services.col1': {it: 'Soluzioni AI', en: 'AI Solutions'},
    'services.col1.desc': {it: 'Costruiamo sistemi AI intelligenti che automatizzano le conversazioni, qualificano i lead e gestiscono le interazioni con i clienti 24/7.', en: 'We build intelligent AI systems that automate conversations, qualify leads, and handle customer interactions around the clock.'},
    'services.col2': {it: 'Automazione', en: 'Automation'},
    'services.col2.desc': {it: 'La giusta automazione dipende dal problema. Tagliamo il rumore per costruire sistemi reali che generano valore.', en: 'The right automation depends entirely on the problem. We cut through the hype to build real systems that deliver value.'},
    'services.col3': {it: 'Crescita & Dati', en: 'Growth & Data'},
    'services.col3.desc': {it: 'I dati senza strategia sono solo supposizioni — costruiamo sistemi che generano valore composto.', en: 'Data without a strategy is just guesswork — we build systems that compound.'},

    // Process
    'process.heading': {it: 'Quattro fasi. Una missione. Sistemi che producono risultati reali.', en: 'Four phases. One mission. Systems that deliver real business outcomes.'},
    'process.desc': {it: 'Il nostro processo è costruito attorno a chiarezza, velocità e risultati misurabili. Ti accompagniamo dalla scoperta al scaling.', en: 'Our process is built around clarity, speed, and measurable results. We partner with you from discovery through scaling.'},
    'process.cta': {it: 'COME FUNZIONA', en: 'HOW IT WORKS'},
    'process.s1': {it: 'Scoperta', en: 'Discover'},
    'process.s1.desc': {it: 'Analizziamo il tuo business, identifichiamo i punti critici e mappiamo le opportunità dove AI e automazione possono generare impatto misurabile.', en: 'We learn your business inside out, identify pain points, and map opportunities where AI and automation will drive the biggest impact.'},
    'process.s2': {it: 'Progettazione', en: 'Design'},
    'process.s2.desc': {it: 'Progettiamo la soluzione giusta — scegliendo tecnologie, definendo workflow e pianificando integrazioni su misura.', en: 'We architect the right solution — choosing technologies, defining workflows, and planning integrations tailored to your needs.'},
    'process.s3': {it: 'Costruzione', en: 'Build'},
    'process.s3.desc': {it: 'Sviluppiamo, testiamo e deployiamo con precisione — dai modelli AI alle integrazioni alle esperienze utente.', en: 'We develop, test, and deploy with precision — from AI models to integrations to user-facing experiences.'},
    'process.s4': {it: 'Scalabilità', en: 'Scale'},
    'process.s4.desc': {it: 'Ottimizziamo le performance, espandiamo le capacità e ci assicuriamo che i sistemi crescano con il tuo business.', en: 'We optimize performance, expand capabilities, and ensure systems grow alongside your business.'},

    // Industries
    'industries.label': {it: 'Industrie', en: 'Industries'},
    'industries.heading': {it: 'TROVA LA TUA\nINDUSTRIA', en: 'FIND YOUR\nINDUSTRY'},
    'industries.desc': {it: 'Soluzioni AI e automazione su misura per ogni settore.', en: 'AI and automation solutions tailored for every sector.'},

    // Stats
    'stats.projects': {it: 'Progetti Completati', en: 'Projects Delivered'},
    'stats.models': {it: 'Modelli AI Deployati', en: 'AI Models Deployed'},
    'stats.hours': {it: 'Ore Risparmiate', en: 'Hours Saved'},
    'stats.retention': {it: 'Retention Clienti', en: 'Client Retention'},

    // CTA
    'cta.label': {it: 'Pronto per iniziare?', en: 'Ready to start?'},
    'cta.heading': {it: 'Costruiamo qualcosa di intelligente insieme.', en: "Let's build something intelligent together."},
    'cta.desc': {it: 'Che tu abbia bisogno di un chatbot AI, automazione dei workflow o una trasformazione digitale completa — siamo qui per realizzarlo.', en: "Whether you need an AI chatbot, workflow automation, or a complete digital transformation — we're here to make it happen."},
    'cta.button': {it: 'CONTATTACI', en: 'GET IN TOUCH'},
    'cta.services': {it: 'VEDI SERVIZI', en: 'VIEW SERVICES'},

    // Footer
    'footer.cta': {it: 'Iniziamo qualcosa', en: "Let's start something"},
    'footer.newsletter': {it: 'Iscriviti alla newsletter', en: 'Sign up for our newsletter'},
    'footer.newsletter.sub': {it: 'LA CONVERSAZIONE CHE NON POSSIAMO SMETTERE DI INIZIARE', en: "THE CONVERSATION WE CAN'T STOP STARTING"},
    'footer.email': {it: 'EMAIL *', en: 'EMAIL *'},
    'footer.submit': {it: 'INVIA', en: 'SUBMIT'},
    'footer.tagline': {it: 'INTELLIGENZA FATTA A MANO', en: 'HAND MADE INTELLIGENCE'},

    // About
    'about.label': {it: 'Chi Siamo', en: 'About Us'},
    'about.heading': {it: 'Il tuo partner AI per risultati di business concreti', en: 'Your AI partner for practical business outcomes'},
    'about.p1': {it: 'Eey Aay è un\'azienda B2B specializzata in AI, automazione e trasformazione digitale che aiuta le imprese a risparmiare tempo, ridurre il lavoro manuale, migliorare l\'esperienza cliente e creare nuovi flussi di ricavi utilizzando AI, software e ottimizzazione dei processi.', en: 'Eey Aay is a B2B AI, automation, and digital transformation company that helps businesses save time, reduce manual work, improve customer experience, and create new revenue streams using AI, software, and process optimization.'},
    'about.p2': {it: 'Ci posizioniamo come partner AI per le aziende che vogliono risultati pratici, non solo tecnologia appariscente.', en: 'We position ourselves as an AI partner for companies that want practical business outcomes, not just flashy tech.'},
    'about.what': {it: 'Cosa Facciamo', en: 'What We Do'},
    'about.what.desc': {it: 'Progettiamo e implementiamo soluzioni in: automazione AI, chatbot e agenti vocali, AI basata sulla conoscenza (RAG), piattaforme AI personalizzate, GPT custom, sviluppo web, integrazioni CRM/ERP, automazione RPA e workflow, SEO, e-commerce, dati, BI e machine learning, email marketing e formazione AI per team.', en: 'We design and implement solutions across: AI automation, chatbots and voice agents, RAG / knowledge-based AI, custom AI platforms, custom GPTs, web development, CRM / ERP integrations, RPA and workflow automation, SEO, e-commerce, data, BI and machine learning, email marketing and AI training for teams.'},

    // Contact
    'contact.label': {it: 'Contatti', en: 'Contact'},
    'contact.heading': {it: 'Parliamo del tuo progetto', en: "Let's talk about your project"},
    'contact.desc': {it: 'Compila il form e ti ricontatteremo entro 24 ore.', en: "Fill out the form and we'll get back to you within 24 hours."},
    'contact.name': {it: 'NOME *', en: 'NAME *'},
    'contact.email': {it: 'EMAIL *', en: 'EMAIL *'},
    'contact.company': {it: 'AZIENDA', en: 'COMPANY'},
    'contact.message': {it: 'MESSAGGIO *', en: 'MESSAGE *'},
    'contact.send': {it: 'INVIA MESSAGGIO', en: 'SEND MESSAGE'},
    'contact.info': {it: 'Informazioni', en: 'Information'},
}

export function LanguageProvider({children}: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>('it')

    const t = useCallback((key: string): string => {
        return translations[key]?.[lang] ?? key
    }, [lang])

    return (
        <LanguageContext.Provider value={{lang, setLang, t}}>
            {children}
        </LanguageContext.Provider>
    )
}
