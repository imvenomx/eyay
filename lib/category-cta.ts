import type {PostCategory} from '@/lib/store'

interface CategoryCta {
    eyebrow: string
    title: string
    desc: string
    button: string
    href: string
}

const FALLBACK: CategoryCta = {
    eyebrow: 'Hai un progetto in mente?',
    title: 'Costruiamo qualcosa di intelligente insieme.',
    desc: 'Partiamo da una chiamata di 30 minuti per capire le tue esigenze.',
    button: 'Contattaci',
    href: '/contact',
}

const MAP: Record<PostCategory, CategoryCta> = {
    ai: {
        eyebrow: 'Vuoi un chatbot AI per la tua azienda?',
        title: 'Trasformiamo le tue conversazioni con i clienti.',
        desc: 'Realizziamo chatbot e agenti vocali che qualificano i lead, supportano i clienti e prenotano appuntamenti — 24/7.',
        button: 'Scopri i nostri AI',
        href: '/service/ai-chatbots',
    },
    automation: {
        eyebrow: 'Hai workflow ripetitivi che stanno mangiando ore?',
        title: 'Automatizziamo i tuoi processi.',
        desc: 'Integrazioni CRM, RPA, email automation. Liberiamo il tuo team dai task manuali.',
        button: 'Vedi automazioni',
        href: '/service/rpa-automation',
    },
    growth: {
        eyebrow: 'Vuoi crescere su Google e online?',
        title: 'Costruiamo sistemi che convertono.',
        desc: 'SEO, e-commerce, dati e BI. Strategie misurabili che generano fatturato reale.',
        button: 'Esplora servizi crescita',
        href: '/service/seo',
    },
    'case-study': FALLBACK,
}

export function ctaForCategory(category: PostCategory): CategoryCta {
    return MAP[category] || FALLBACK
}
