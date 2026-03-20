'use client'
import Link from 'next/link'
import Image from 'next/image'
import {Menu, X} from 'lucide-react'
import React, {useEffect, useState} from 'react'
import BinaryHover from '@/components/binary-hover'
import {useLanguage} from '@/lib/language-context'
import ChatModal from '@/components/chat-modal'

const serviceColumns = [
    {
        title: 'Soluzioni AI',
        items: [
            {label: 'CHATBOT AI', href: '/service/ai-chatbots'},
            {label: 'AGENTI VOCALI AI', href: '/service/ai-voice-agents'},
            {label: 'AI BASATA SULLA CONOSCENZA', href: '/service/rag-knowledge-ai'},
            {label: 'GPT PERSONALIZZATI', href: '/service/custom-gpts'},
            {label: 'AI WHITE-LABEL', href: '/service/white-label-ai'},
        ],
    },
    {
        title: 'Automazione',
        items: [
            {label: 'AUTOMAZIONE RPA', href: '/service/rpa-automation'},
            {label: 'INTEGRAZIONE CRM / ERP', href: '/service/crm-erp-integration'},
            {label: 'CONFIGURAZIONE GOHIGHLEVEL', href: '/service/gohighlevel'},
            {label: 'AUTOMAZIONE EMAIL', href: '/service/email-automation'},
        ],
    },
    {
        title: 'Crescita & Dati',
        items: [
            {label: 'SVILUPPO WEB', href: '/service/web-development'},
            {label: 'SEO & SEO LOCALE', href: '/service/seo'},
            {label: 'E-COMMERCE', href: '/service/ecommerce'},
            {label: 'BI & MACHINE LEARNING', href: '/service/bi-machine-learning'},
            {label: 'FORMAZIONE AI', href: '/service/ai-training'},
        ],
    },
]

const pageLinks = [
    {label: 'Chi Siamo', href: '/about'},
    {label: 'Servizi', href: '/#services'},
    {label: 'Processo', href: '/#process'},
    {label: 'Contatti', href: '/contact'},
]

function LangSwitch({lightNav}: { lightNav: boolean }) {
    const {lang, setLang} = useLanguage()
    const borderColor = lightNav ? 'border-black/10' : 'border-white/10'
    const textColor = lightNav ? 'text-black' : 'text-white'
    const mutedColor = lightNav ? 'text-black/30' : 'text-white/30'
    return (
        <button
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full border ${borderColor} text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer`}>
            <span className={lang === 'it' ? textColor : mutedColor}>IT</span>
            <span className={mutedColor}>/</span>
            <span className={lang === 'en' ? textColor : mutedColor}>EN</span>
        </button>
    )
}

export const HeroHeader = () => {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [chatOpen, setChatOpen] = React.useState(false)
    const [lightNav, setLightNav] = useState(false)

    // Observe white/light sections to toggle nav theme
    useEffect(() => {
        const lightSections = document.querySelectorAll('[data-nav-theme="light"]')
        if (lightSections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                // Check if any light section is at the top of the viewport
                let isLight = false
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const rect = entry.boundingClientRect
                        // Section is near the top of viewport (where the nav sits)
                        if (rect.top < 60 && rect.bottom > 60) {
                            isLight = true
                        }
                    }
                })
                setLightNav(isLight)
            },
            {threshold: [0, 0.1, 0.5, 1], rootMargin: '-1px 0px -90% 0px'}
        )

        lightSections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    // Also listen to scroll for more accurate detection
    useEffect(() => {
        const handleScroll = () => {
            const lightSections = document.querySelectorAll('[data-nav-theme="light"]')
            let isOverLight = false
            lightSections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                if (rect.top < 60 && rect.bottom > 60) {
                    isOverLight = true
                }
            })
            setLightNav(isOverLight)
        }
        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navClasses = lightNav
        ? 'bg-white/80 border-black/5 backdrop-blur-2xl'
        : 'bg-black/40 border-white/5 backdrop-blur-2xl'
    const textColor = lightNav ? 'text-black' : 'text-white'
    const mutedColor = lightNav ? 'text-black/50' : 'text-white/40'
    const borderColor = lightNav ? 'border-black/10' : 'border-white/10'

    return (
        <header>
            <nav className={`fixed z-50 w-full border-b transition-colors duration-300 ${navClasses}`}>
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex items-center justify-between py-3 lg:py-4">
                        <Link href="/" aria-label="home" className="block relative w-[100px] h-[28px]">
                            <Image
                                src={lightNav ? '/eylogo-black.png' : '/eylogo.png'}
                                alt="Eey Aay"
                                fill
                                className="object-contain transition-opacity duration-300"
                                sizes="100px"
                                priority
                            />
                        </Link>

                        {/* Center — search pill (opens chat) */}
                        <div className="hidden md:flex items-center">
                            <button onClick={() => setChatOpen(true)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full border ${borderColor} ${lightNav ? 'bg-black/5' : 'bg-black/30'} backdrop-blur-xl cursor-pointer hover:${lightNav ? 'border-black/20' : 'border-white/20'} transition-colors`}>
                                <span className={`text-sm font-mono transition-colors duration-300 ${mutedColor}`}>Chiedici qualsiasi cosa</span>
                                <svg className={`w-4 h-4 transition-colors duration-300 ${mutedColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Language switcher */}
                            <LangSwitch lightNav={lightNav}/>

                            {/* Menu toggle */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
                                className={`relative z-50 flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full border ${borderColor} transition-colors`}>
                                {menuOpen ? (
                                    <>
                                        <X className="size-4 text-white"/>
                                        <span className="text-xs font-mono uppercase tracking-wider text-white">Chiudi</span>
                                    </>
                                ) : (
                                    <>
                                        <Menu className={`size-4 transition-colors duration-300 ${textColor}`}/>
                                        <span className={`text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${textColor}`}>Menu</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mega menu overlay */}
            <div className={`fixed inset-0 z-40 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setMenuOpen(false)}/>
                <div className={`relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-8 h-full flex flex-col transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                    <div className="md:hidden mb-8">
                        <button onClick={() => { setMenuOpen(false); setChatOpen(true) }}
                            className="w-full flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl cursor-pointer">
                            <span className="text-sm text-white/40 font-mono">Chiedici qualsiasi cosa</span>
                            <svg className="w-4 h-4 text-white/30 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 py-8 overflow-y-auto">
                        {serviceColumns.map((column) => (
                            <div key={column.title}>
                                <h3 className="text-white/90 text-base font-medium mb-6">{column.title}</h3>
                                <ul className="space-y-3">
                                    {column.items.map((item) => (
                                        <li key={item.label}>
                                            <Link href={item.href} onClick={() => setMenuOpen(false)}
                                                  className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200">
                                                <span className="size-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors"/>
                                                <BinaryHover className="text-xs tracking-wider">{item.label}</BinaryHover>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div>
                            <div className="space-y-4">
                                {pageLinks.map((link) => (
                                    <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                                          className="block text-white/80 hover:text-white text-lg transition-colors duration-200">
                                        <BinaryHover>{link.label}</BinaryHover>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-8">
                                <Link href="#contact" onClick={() => setMenuOpen(false)}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm font-mono">
                                    <span className="size-2 rounded-full bg-white"/>
                                    <BinaryHover>Inizia ora</BinaryHover>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 flex flex-wrap gap-3">
                        {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                            <span key={social}
                                  className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
                                <BinaryHover>{social}</BinaryHover>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {/* Chat modal */}
            <ChatModal open={chatOpen} onClose={() => setChatOpen(false)}/>
        </header>
    )
}
