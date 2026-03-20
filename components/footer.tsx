'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState, useRef, useCallback} from "react"
import BinaryHover from '@/components/binary-hover'

const serviceColumns = [
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
            {label: 'Sviluppo Web', href: '/service/web-development'},
            {label: 'Automazione RPA', href: '/service/rpa-automation'},
            {label: 'Integrazione CRM', href: '/service/crm-erp-integration'},
            {label: 'Automazione Email', href: '/service/email-automation'},
            {label: 'GoHighLevel', href: '/service/gohighlevel'},
        ],
    },
    {
        title: 'Crescita',
        items: [
            {label: 'SEO & SEO Locale', href: '/service/seo'},
            {label: 'E-commerce', href: '/service/ecommerce'},
            {label: 'Dati & BI', href: '/service/bi-machine-learning'},
            {label: 'Formazione AI', href: '/service/ai-training'},
        ],
    },
]

const pageLinks = [
    {label: 'Chi Siamo', href: '/about'},
    {label: 'Servizi', href: '/#services'},
    {label: 'Industrie', href: '/#industries'},
    {label: 'Contatti', href: '/contact'},
]

export default function FooterSection() {
    const [email, setEmail] = useState('')
    const footerRef = useRef<HTMLElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!spotlightRef.current || !footerRef.current) return
        const rect = footerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        spotlightRef.current.style.left = x + 'px'
        spotlightRef.current.style.top = y + 'px'
        spotlightRef.current.style.opacity = '1'
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (spotlightRef.current) spotlightRef.current.style.opacity = '0'
    }, [])

    return (
        <footer ref={footerRef} className="bg-black text-white relative overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {/* Spotlight circle — white with mix-blend-difference inverts colors */}
            <div
                ref={spotlightRef}
                className="absolute w-[350px] h-[350px] rounded-full bg-white pointer-events-none mix-blend-difference transition-opacity duration-300"
                style={{transform: 'translate(-50%, -50%)', opacity: 0, top: '-100px', left: '-100px'}}
            />
            {/* Top section: CTA + Newsletter */}
            <div className="w-full px-8 md:px-16 lg:px-20 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 md:py-24">
                    {/* Left: CTA */}
                    <div className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-white mr-3 mt-3"/>
                        <Link href="#contact" className="text-3xl md:text-4xl font-vcr hover:opacity-70 transition-opacity">
                            Iniziamo qualcosa &rarr;
                        </Link>
                    </div>

                    {/* Right: Newsletter */}
                    <div>
                        <p className="text-base mb-2">Iscriviti alla newsletter</p>
                        <p className="text-xs font-mono text-white/40 uppercase tracking-[0.15em] mb-6">
                            LA CONVERSAZIONE CHE NON POSSIAMO SMETTERE DI INIZIARE
                        </p>
                        <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                            EMAIL *
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="johndoe@email.com"
                            className="w-full max-w-sm bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 mb-4 font-mono"
                        />
                        <br/>
                        <button className="px-5 py-2 rounded-full border border-white/20 text-xs font-vcr uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                            INVIA
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle: 4-column links grid */}
            <div className="w-full px-8 md:px-16 lg:px-20 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-12">
                    {/* Service columns */}
                    {serviceColumns.map((col, ci) => (
                        <div key={col.title}
                             className={`pb-8 md:pb-0 ${ci < serviceColumns.length - 1 ? 'md:border-r border-white/5' : ''} ${ci > 0 ? 'md:pl-8' : ''} ${ci < serviceColumns.length - 1 ? 'md:pr-8' : ''}`}>
                            <h4 className="text-sm font-medium mb-5">{col.title}</h4>
                            <ul className="space-y-3">
                                {col.items.map(item => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-xs font-mono text-white/40 uppercase tracking-wider hover:text-white transition-colors">
                                            <BinaryHover>{item.label}</BinaryHover>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Work / Contact column */}
                    <div className="md:pl-8 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-white/5">
                        <div className="space-y-3 mb-8">
                            {pageLinks.map(link => (
                                <Link key={link.label} href={link.href}
                                      className="block text-sm text-white/80 hover:text-white transition-colors">
                                    <BinaryHover>{link.label}</BinaryHover>
                                </Link>
                            ))}
                        </div>
                        <div className="space-y-2 text-xs text-white/40">
                            <p>hello@eeyaay.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social links row */}
            <div className="w-full px-8 md:px-16 lg:px-20 border-t border-white/10 py-6">
                <div className="flex flex-wrap gap-3">
                    {['INSTAGRAM', 'FACEBOOK', 'LINKEDIN'].map(s => (
                        <span key={s}
                              className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/50 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
                            <BinaryHover>{s}</BinaryHover>
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="w-full px-8 md:px-16 lg:px-20 border-t border-white/10 py-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/30">
                        <span>&copy; 2026 Eey Aay. All Rights Reserved.</span>
                        <Link href="#" className="hover:text-white/60 transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white/60 transition-colors">Termini &amp; Condizioni</Link>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-white/60 font-vcr">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60"/>
                        INTELLIGENZA FATTA A MANO&trade;
                    </div>
                </div>
            </div>
        </footer>
    )
}
