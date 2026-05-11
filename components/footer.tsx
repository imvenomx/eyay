'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState, useRef, useCallback} from "react"
import BinaryHover from '@/components/binary-hover'
import {useLanguage} from '@/lib/language-context'
import {SOCIAL_LINKS} from '@/lib/social-links'
import {serviceColumns, pageLinks} from '@/lib/navigation'

type NewsletterStatus = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error'

export default function FooterSection() {
    const {t} = useLanguage()
    const [email, setEmail] = useState('')
    const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>('idle')
    const footerRef = useRef<HTMLElement>(null)
    const spotlightRef = useRef<HTMLDivElement>(null)

    const handleNewsletter = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        if (newsletterStatus === 'submitting') return
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setNewsletterStatus('error')
            return
        }
        setNewsletterStatus('submitting')
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email.trim()}),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                setNewsletterStatus('error')
                return
            }
            setNewsletterStatus(data.duplicate ? 'duplicate' : 'success')
            setEmail('')
        } catch {
            setNewsletterStatus('error')
        }
    }, [email, newsletterStatus])

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
                        <p className="text-base mb-2">{t('footer.newsletter')}</p>
                        <p className="text-xs font-mono text-white/40 uppercase tracking-[0.15em] mb-6">
                            {t('footer.newsletter.sub')}
                        </p>
                        <form onSubmit={handleNewsletter} noValidate>
                            <label htmlFor="newsletter-email" className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                                EMAIL *
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value)
                                    if (newsletterStatus !== 'idle' && newsletterStatus !== 'submitting') setNewsletterStatus('idle')
                                }}
                                placeholder={t('newsletter.placeholder')}
                                disabled={newsletterStatus === 'submitting'}
                                className="w-full max-w-sm bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 mb-4 font-mono disabled:opacity-50"
                            />
                            <br/>
                            <button
                                type="submit"
                                disabled={newsletterStatus === 'submitting'}
                                className="px-5 py-2 rounded-full border border-white/20 text-xs font-vcr uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white">
                                {newsletterStatus === 'submitting' ? t('newsletter.sending') : 'INVIA'}
                            </button>
                            {newsletterStatus === 'success' && (
                                <p className="mt-3 text-[10px] font-mono uppercase tracking-wider text-green-400">{t('newsletter.success')}</p>
                            )}
                            {newsletterStatus === 'duplicate' && (
                                <p className="mt-3 text-[10px] font-mono uppercase tracking-wider text-white/50">{t('newsletter.duplicate')}</p>
                            )}
                            {newsletterStatus === 'error' && (
                                <p className="mt-3 text-[10px] font-mono uppercase tracking-wider text-red-400">{t('newsletter.error')}</p>
                            )}
                        </form>
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
                    {SOCIAL_LINKS.map(s => (
                        <a key={s.label}
                           href={s.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={`Eey Aay su ${s.label}`}
                           className="px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/50 hover:text-white hover:border-white/30 transition-colors">
                            <BinaryHover>{s.label.toUpperCase()}</BinaryHover>
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="w-full px-8 md:px-16 lg:px-20 border-t border-white/10 py-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/50">
                        <span>&copy; 2026 Eey Aay. All Rights Reserved.</span>
                        <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white/60 transition-colors">Termini &amp; Condizioni</Link>
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
