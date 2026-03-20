'use client'
import React, {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {useLanguage} from '@/lib/language-context'
import BinaryHover from '@/components/binary-hover'

const stepKeys = ['process.s1', 'process.s2', 'process.s3', 'process.s4']

function StepCard({titleKey, descKey}: {titleKey: string; descKey: string}) {
    const {t} = useLanguage()
    const title = t(titleKey)
    const [display, setDisplay] = useState(title)
    const [hovering, setHovering] = useState(false)
    useEffect(() => {setDisplay(title)}, [title])
    useEffect(() => {
        if (!hovering) {setDisplay(title); return}
        let frame = 0; const max = 10
        const interval = setInterval(() => { frame++; if (frame >= max) {clearInterval(interval); setDisplay(title); return}; const reveal = Math.floor((frame / max) * title.length); setDisplay(title.split('').map((c, i) => c === ' ' ? ' ' : i < reveal ? title[i] : Math.random() > 0.5 ? '1' : '0').join('')) }, 45)
        return () => clearInterval(interval)
    }, [hovering, title])
    return (
        <div className="relative overflow-hidden group cursor-default h-full" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out"/>
            <div className="relative z-10 pt-8 pb-6 px-6 md:px-8">
                <h3 className="text-lg mb-5 font-vcr group-hover:text-white transition-colors duration-300">{display}</h3>
                <p className="text-[12px] text-black/40 group-hover:text-white/50 leading-relaxed transition-colors duration-300">{t(descKey)}</p>
            </div>
        </div>
    )
}

export default function ProcessBento() {
    const sectionRef = useRef<HTMLElement>(null)
    const {t} = useLanguage()
    useEffect(() => {
        if (typeof window === 'undefined') return
        const load = async () => { const gsap = (await import('gsap')).default; const {ScrollTrigger} = await import('gsap/ScrollTrigger'); gsap.registerPlugin(ScrollTrigger); if (!sectionRef.current) return; const els = sectionRef.current.querySelectorAll('.fade-up'); els.forEach((el, i) => { gsap.fromTo(el, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, scrollTrigger: {trigger: el, start: 'top 92%', toggleActions: 'play none none none'}, delay: i * 0.04}) }) }
        load()
    }, [])
    return (
        <section ref={sectionRef} className="bg-white text-black" id="process" data-nav-theme="light">
            <div className="border-t border-black/15 px-6 md:px-12 lg:px-16 py-20 md:py-28">
                <div className="fade-up border-b border-black/15 pb-12 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                        <div className="md:border-r border-black/15 md:pr-12">
                            <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                            <span className="text-3xl md:text-4xl leading-snug inline font-vcr">{t('process.heading')}</span>
                        </div>
                        <div className="text-[13px] text-black/50 leading-relaxed md:pl-12 md:pt-2">{t('process.desc')}</div>
                    </div>
                </div>
                <div className="fade-up flex justify-center mb-16">
                    <Link href="/#process" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 text-xs tracking-wider hover:bg-black hover:text-white transition-all duration-300 font-vcr-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-black"/><BinaryHover>{t('process.cta')}</BinaryHover>
                    </Link>
                </div>
                <div className="fade-up grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-black/15">
                    {stepKeys.map((key, i) => (
                        <div key={key} className={`${i < stepKeys.length - 1 ? 'md:border-r border-black/15' : ''} ${i < stepKeys.length - 1 ? 'border-b md:border-b-0 border-black/10' : ''}`}>
                            <StepCard titleKey={key} descKey={`${key}.desc`}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
