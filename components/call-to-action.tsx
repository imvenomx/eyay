'use client'
import Link from 'next/link'
import React, {useEffect, useRef} from "react"
import {useLanguage} from '@/lib/language-context'
import BinaryHover from '@/components/binary-hover'

export default function CallToAction() {
    const sectionRef = useRef<HTMLElement>(null)
    const {t} = useLanguage()
    useEffect(() => {
        if (typeof window === 'undefined') return
        const load = async () => { const gsap = (await import('gsap')).default; const {ScrollTrigger} = await import('gsap/ScrollTrigger'); gsap.registerPlugin(ScrollTrigger); if (!sectionRef.current) return; gsap.fromTo(sectionRef.current, {filter: 'blur(8px)', opacity: 0}, {filter: 'blur(0px)', opacity: 1, duration: 0.8, scrollTrigger: {trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none'}}) }
        load()
    }, [])
    return (
        <section ref={sectionRef} className="bg-white text-black" id="contact" data-nav-theme="light">
            <div className="border-t border-black/15 px-6 md:px-12 lg:px-16 py-24 md:py-36">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-[10px] font-vcr-mono uppercase tracking-[0.25em] text-black/40 mb-6">{t('cta.label')}</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-vcr-mono leading-tight mb-6" style={{fontWeight: 500}}>{t('cta.heading')}</h2>
                    <p className="text-sm text-black/50 leading-relaxed mb-10 max-w-lg mx-auto">{t('cta.desc')}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black text-white text-xs tracking-wider hover:bg-black/80 transition-all duration-300 font-vcr-mono">
                            <BinaryHover>{t('cta.button')}</BinaryHover>
                        </Link>
                        <Link href="/#services" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 text-xs tracking-wider hover:bg-black hover:text-white transition-all duration-300 font-vcr-mono">
                            <BinaryHover>{t('cta.services')}</BinaryHover>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
