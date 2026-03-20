'use client'
import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {useLanguage} from '@/lib/language-context'
import BinaryHover from '@/components/binary-hover'

const columns = [
    {titleKey: 'services.col1', descKey: 'services.col1.desc', items: [{label: 'Chatbot AI', href: '/service/ai-chatbots'}, {label: 'Agenti Vocali AI', href: '/service/ai-voice-agents'}, {label: 'AI Basata sulla Conoscenza', href: '/service/rag-knowledge-ai'}, {label: 'GPT Personalizzati', href: '/service/custom-gpts'}, {label: 'Piattaforme AI White-Label', href: '/service/white-label-ai'}]},
    {titleKey: 'services.col2', descKey: 'services.col2.desc', items: [{label: 'Automazione RPA & Processi', href: '/service/rpa-automation'}, {label: 'Integrazione CRM / ERP', href: '/service/crm-erp-integration'}, {label: 'Configurazione GoHighLevel', href: '/service/gohighlevel'}, {label: 'Automazione Email', href: '/service/email-automation'}]},
    {titleKey: 'services.col3', descKey: 'services.col3.desc', items: [{label: 'Sviluppo Web', href: '/service/web-development'}, {label: 'SEO & SEO Locale', href: '/service/seo'}, {label: 'E-commerce', href: '/service/ecommerce'}, {label: 'BI & Machine Learning', href: '/service/bi-machine-learning'}, {label: 'Formazione AI', href: '/service/ai-training'}]},
]

function ServiceItem({label, href}: {label: string; href: string}) {
    const [display, setDisplay] = useState(label)
    const [hovering, setHovering] = useState(false)
    useEffect(() => {
        if (!hovering) {setDisplay(label); return}
        let frame = 0; const max = 10
        const interval = setInterval(() => { frame++; if (frame >= max) {clearInterval(interval); setDisplay(label); return}; const reveal = Math.floor((frame / max) * label.length); setDisplay(label.split('').map((c, i) => c === ' ' ? ' ' : i < reveal ? label[i] : Math.random() > 0.5 ? '1' : '0').join('')) }, 45)
        return () => clearInterval(interval)
    }, [hovering, label])
    return (
        <Link href={href} className="relative block py-3.5 border-b border-black/15 last:border-b-0 overflow-hidden group pl-4" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"/>
            <span className="relative z-10 text-black/65 group-hover:text-white transition-colors duration-300 font-mono text-base">{display}</span>
        </Link>
    )
}

export default function ServicesBento() {
    const sectionRef = useRef<HTMLElement>(null)
    const {t} = useLanguage()
    useEffect(() => {
        if (typeof window === 'undefined') return
        const load = async () => { const gsap = (await import('gsap')).default; const {ScrollTrigger} = await import('gsap/ScrollTrigger'); gsap.registerPlugin(ScrollTrigger); if (!sectionRef.current) return; const els = sectionRef.current.querySelectorAll('.fade-up'); els.forEach((el, i) => { gsap.fromTo(el, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, scrollTrigger: {trigger: el, start: 'top 92%', toggleActions: 'play none none none'}, delay: i * 0.04}) }) }
        load()
    }, [])
    return (
        <section ref={sectionRef} className="bg-white text-black" id="services" data-nav-theme="light">
            <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28">
                <div className="fade-up border-b border-black/15 pb-12 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                        <div className="md:border-r border-black/15 md:pr-12">
                            <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                            <span className="text-3xl md:text-4xl leading-snug inline font-vcr">{t('services.heading')}</span>
                        </div>
                        <div className="text-[13px] text-black/50 leading-relaxed md:pl-12 md:pt-2">{t('services.desc')}</div>
                    </div>
                </div>
                <div className="fade-up flex justify-center mb-16">
                    <Link href="/contact" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 text-xs tracking-wider hover:bg-black hover:text-white transition-all duration-300 font-vcr-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-black"/><BinaryHover>{t('services.cta')}</BinaryHover>
                    </Link>
                </div>
                <div className="fade-up grid grid-cols-1 md:grid-cols-3 border-t border-black/15">
                    {columns.map((col, ci) => (
                        <div key={ci} className={`pt-8 pb-6 ${ci < columns.length - 1 ? 'md:border-r border-black/15' : ''} ${ci > 0 ? 'md:pl-10' : ''} ${ci < columns.length - 1 ? 'md:pr-10' : ''}`}>
                            <h3 className="text-lg mb-5 font-vcr">{t(col.titleKey)}</h3>
                            <p className="text-[12px] text-black/40 leading-relaxed mb-8">{t(col.descKey)}</p>
                            <div>{col.items.map(item => <ServiceItem key={item.label} label={item.label} href={item.href}/>)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
