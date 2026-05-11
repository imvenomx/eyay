'use client'
import React from 'react'
import Link from 'next/link'
import {useLanguage} from '@/lib/language-context'
import BinaryHover from '@/components/binary-hover'
import {allServices} from '@/lib/services-data'

// Group services by category for the page layout
interface ServiceCategory {
    id: 'ai' | 'automation' | 'growth'
    titleIt: string
    titleEn: string
    descIt: string
    descEn: string
    slugs: string[]
}

const CATEGORIES: ServiceCategory[] = [
    {
        id: 'ai',
        titleIt: 'Soluzioni AI',
        titleEn: 'AI Solutions',
        descIt: 'Costruiamo sistemi AI intelligenti che automatizzano le conversazioni, qualificano i lead e gestiscono le interazioni con i clienti 24/7.',
        descEn: 'We build intelligent AI systems that automate conversations, qualify leads, and handle customer interactions 24/7.',
        slugs: ['ai-chatbots', 'ai-voice-agents', 'rag-knowledge-ai', 'custom-gpts', 'white-label-ai'],
    },
    {
        id: 'automation',
        titleIt: 'Automazione',
        titleEn: 'Automation',
        descIt: 'La giusta automazione dipende dal problema. Tagliamo il rumore per costruire sistemi reali che generano valore.',
        descEn: 'The right automation depends on the problem. We cut through the noise to build real systems that deliver value.',
        slugs: ['rpa-automation', 'crm-erp-integration', 'gohighlevel', 'email-automation', 'web-development'],
    },
    {
        id: 'growth',
        titleIt: 'Crescita & Dati',
        titleEn: 'Growth & Data',
        descIt: 'I dati senza strategia sono solo supposizioni — costruiamo sistemi che generano valore composto.',
        descEn: 'Data without strategy is just guesswork — we build systems that compound value.',
        slugs: ['seo', 'ecommerce', 'bi-machine-learning', 'ai-training'],
    },
]

// English titles per service (Italian comes from services-data)
const TITLE_EN: Record<string, string> = {
    'ai-chatbots': 'AI Chatbots',
    'ai-voice-agents': 'AI Voice Agents',
    'rag-knowledge-ai': 'Knowledge-Based AI (RAG)',
    'custom-gpts': 'Custom GPTs',
    'white-label-ai': 'White-Label AI',
    'rpa-automation': 'RPA Automation',
    'crm-erp-integration': 'CRM & ERP Integration',
    'gohighlevel': 'GoHighLevel',
    'email-automation': 'Email Marketing',
    'web-development': 'Web Development',
    'seo': 'SEO & Local SEO',
    'ecommerce': 'E-commerce',
    'bi-machine-learning': 'ML, BI & Data',
    'ai-training': 'AI Training',
}

// Short English headlines per service
const HEADLINE_EN: Record<string, string> = {
    'ai-chatbots': 'Conversational AI that qualifies leads and supports customers 24/7',
    'ai-voice-agents': 'AI voice agents for inbound and outbound calls',
    'rag-knowledge-ai': 'AI systems connected to your company knowledge',
    'custom-gpts': 'Custom AI assistants tailored to your workflows',
    'white-label-ai': 'Branded AI platforms you can resell',
    'rpa-automation': 'Automate repetitive processes across your stack',
    'crm-erp-integration': 'Connect CRM, ERP and sales tools that finally talk to each other',
    'gohighlevel': 'Marketing automation platforms, white-labelled',
    'email-automation': 'Campaigns, automations and deliverability that actually work',
    'web-development': 'Modern websites, portals and web apps',
    'seo': 'Visibility on Google and local maps',
    'ecommerce': 'Online stores optimized for conversion',
    'bi-machine-learning': 'Dashboards, forecasts, predictive models',
    'ai-training': 'Hands-on AI training for your team',
}

export default function ServicesPage() {
    const {lang, t} = useLanguage()
    const isIt = lang === 'it'

    const getService = (slug: string) => allServices.find(s => s.slug === slug)

    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-20 md:pt-36 md:pb-28">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">
                    {isIt ? 'Servizi // Cosa facciamo' : 'Services // What we do'}
                </p>

                {/* Heading */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
                    <div className="md:col-span-7">
                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-1.5"/>
                        <h1 className="text-4xl md:text-6xl leading-[1.05] inline font-vcr" style={{fontWeight: 900}}>
                            {isIt
                                ? <>14 servizi.<br/>Una sola missione: risultati misurabili.</>
                                : <>14 services.<br/>One mission: measurable results.</>}
                        </h1>
                    </div>
                    <div className="md:col-span-5 md:pt-3">
                        <p className="text-sm text-black/55 leading-relaxed">
                            {isIt
                                ? "Tutto quello che facciamo è progettato per generare risultati di business misurabili — non tecnologia appariscente. Scegli il servizio più adatto al tuo problema, o parla con noi se non sai da dove iniziare."
                                : "Everything we ship is engineered to deliver measurable business outcomes — not flashy tech. Pick the service that fits your problem, or talk to us if you're not sure where to start."}
                        </p>
                    </div>
                </div>

                {/* Categories */}
                {CATEGORIES.map((cat, ci) => (
                    <section key={cat.id} className={ci > 0 ? 'mt-20 md:mt-28' : ''}>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-10 border-t border-black/10 pt-10">
                            <div className="md:col-span-4">
                                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">
                                    {`0${ci + 1} //`}
                                </p>
                                <h2 className="text-3xl md:text-4xl font-vcr leading-tight" style={{fontWeight: 900}}>
                                    {isIt ? cat.titleIt : cat.titleEn}
                                </h2>
                            </div>
                            <div className="md:col-span-8 md:pt-1">
                                <p className="text-base text-black/65 leading-relaxed max-w-2xl">
                                    {isIt ? cat.descIt : cat.descEn}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
                            {cat.slugs.map(slug => {
                                const svc = getService(slug)
                                if (!svc) return null
                                const title = isIt ? svc.title : (TITLE_EN[slug] || svc.title)
                                const headline = isIt ? svc.headline : (HEADLINE_EN[slug] || svc.headline)
                                return (
                                    <Link key={slug} href={`/service/${slug}`}
                                          className="group relative bg-white p-6 md:p-7 flex flex-col hover:bg-black/[0.02] transition-colors">
                                        {/* Crosshair corners on hover */}
                                        <span className="absolute top-0 left-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute top-0 left-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute top-0 right-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute top-0 right-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute bottom-0 left-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute bottom-0 left-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute bottom-0 right-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        <span className="absolute bottom-0 right-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>

                                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
                                            /service/{slug}
                                        </p>
                                        <h3 className="font-vcr text-xl leading-tight mb-3">
                                            <BinaryHover>{title}</BinaryHover>
                                        </h3>
                                        <p className="text-sm text-black/55 leading-relaxed line-clamp-3 mb-5 flex-1">
                                            {headline}
                                        </p>
                                        <span className="font-vcr text-[10px] uppercase tracking-[0.2em] text-black/60 group-hover:text-black transition-colors mt-auto">
                                            {isIt ? 'Scopri →' : 'Learn more →'}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <div className="mt-20 md:mt-28 border-t border-black/10 pt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-7">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">
                            {isIt ? 'Non sai da dove partire?' : 'Not sure where to start?'}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-vcr leading-tight" style={{fontWeight: 900}}>
                            {isIt
                                ? <>Parliamone.<br/>20 minuti, nessun impegno.</>
                                : <>Let&apos;s talk.<br/>20 minutes, no strings attached.</>}
                        </h2>
                    </div>
                    <div className="md:col-span-5 flex md:items-end md:justify-end">
                        <Link href="/contact" data-magnetic
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-vcr uppercase tracking-[0.2em] hover:bg-black/80 transition-colors">
                            <BinaryHover>{t('cta.button')}</BinaryHover>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
