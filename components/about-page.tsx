'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useLanguage} from '@/lib/language-context'
import BinaryHover from '@/components/binary-hover'

const capabilities = [
    {label: 'Chatbot AI', href: '/service/ai-chatbots'},
    {label: 'Agenti Vocali AI', href: '/service/ai-voice-agents'},
    {label: 'AI Basata sulla Conoscenza', href: '/service/rag-knowledge-ai'},
    {label: 'GPT Personalizzati', href: '/service/custom-gpts'},
    {label: 'AI White-Label', href: '/service/white-label-ai'},
    {label: 'Automazione RPA', href: '/service/rpa-automation'},
    {label: 'Integrazione CRM / ERP', href: '/service/crm-erp-integration'},
    {label: 'Sviluppo Web', href: '/service/web-development'},
    {label: 'SEO & SEO Locale', href: '/service/seo'},
    {label: 'E-commerce', href: '/service/ecommerce'},
    {label: 'BI & Machine Learning', href: '/service/bi-machine-learning'},
    {label: 'Automazione Email', href: '/service/email-automation'},
    {label: 'Formazione AI', href: '/service/ai-training'},
    {label: 'GoHighLevel', href: '/service/gohighlevel'},
]

export default function AboutPage() {
    const {t} = useLanguage()
    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="mx-4 md:mx-8 lg:mx-12 border-l border-r border-black/15">
                {/* Header */}
                <div className="px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-20 border-b border-black/15">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">{t('about.label')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                        <div className="md:border-r border-black/15 md:pr-12">
                            <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                            <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr" style={{fontWeight: 500}}>{t('about.heading')}</h1>
                        </div>
                        <div className="text-sm text-black/50 leading-relaxed md:pl-12 md:pt-2">{t('about.p1')}</div>
                    </div>
                </div>

                {/* Logo + mission */}
                <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28 border-b border-black/15">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="flex items-center justify-center">
                            <Image src="/eylogo-black.png" alt="Eey Aay" width={200} height={60} className="opacity-80"/>
                        </div>
                        <div>
                            <p className="text-lg text-black/70 leading-relaxed">{t('about.p2')}</p>
                        </div>
                    </div>
                </div>

                {/* What we do — linked and translated */}
                <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28 border-b border-black/15">
                    <h2 className="text-2xl md:text-4xl font-vcr mb-8" style={{fontWeight: 500}}>{t('about.what')}</h2>
                    <p className="text-sm text-black/50 leading-relaxed max-w-3xl mb-12">{t('about.what.desc')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-0 border-t border-l border-black/15">
                        {capabilities.map((cap) => (
                            <Link key={cap.label} href={cap.href}
                                  className="group relative border-r border-b border-black/15 p-4 text-center overflow-hidden">
                                <div className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"/>
                                <span className="relative z-10 text-xs font-mono text-black/70 group-hover:text-white transition-colors duration-300">
                                    <BinaryHover>{cap.label}</BinaryHover>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28 text-center">
                    <h3 className="text-3xl md:text-4xl font-vcr mb-8" style={{fontWeight: 500}}>{t('cta.heading')}</h3>
                    <Link href="/contact" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black text-white text-xs tracking-wider hover:bg-black/80 transition-all duration-300 font-vcr-mono">
                        <BinaryHover>{t('cta.button')}</BinaryHover>
                    </Link>
                </div>
            </div>
        </main>
    )
}
