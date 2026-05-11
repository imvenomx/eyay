export interface NavItem {
    label: string
    href: string
}

export interface NavColumn {
    title: string
    items: NavItem[]
}

// Service mega-menu (shared by header + footer)
export const serviceColumns: NavColumn[] = [
    {
        title: 'Soluzioni AI',
        items: [
            {label: 'Chatbot AI', href: '/service/ai-chatbots'},
            {label: 'Agenti Vocali AI', href: '/service/ai-voice-agents'},
            {label: 'AI Basata sulla Conoscenza', href: '/service/rag-knowledge-ai'},
            {label: 'GPT Personalizzati', href: '/service/custom-gpts'},
            {label: 'AI White-Label', href: '/service/white-label-ai'},
        ],
    },
    {
        title: 'Automazione',
        items: [
            {label: 'Automazione RPA', href: '/service/rpa-automation'},
            {label: 'Integrazione CRM / ERP', href: '/service/crm-erp-integration'},
            {label: 'GoHighLevel', href: '/service/gohighlevel'},
            {label: 'Automazione Email', href: '/service/email-automation'},
            {label: 'Sviluppo Web', href: '/service/web-development'},
        ],
    },
    {
        title: 'Crescita & Dati',
        items: [
            {label: 'SEO & SEO Locale', href: '/service/seo'},
            {label: 'E-commerce', href: '/service/ecommerce'},
            {label: 'BI & Machine Learning', href: '/service/bi-machine-learning'},
            {label: 'Formazione AI', href: '/service/ai-training'},
        ],
    },
]

// Primary nav (header + footer)
export const pageLinks: NavItem[] = [
    {label: 'Chi Siamo', href: '/about'},
    {label: 'Servizi', href: '/#services'},
    {label: 'Case Studies', href: '/case-studies'},
    {label: 'Blog', href: '/blog'},
    {label: 'Contatti', href: '/contact'},
]
