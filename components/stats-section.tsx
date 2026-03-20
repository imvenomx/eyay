'use client'
import React, {useEffect, useRef, useState} from 'react'
import {useLanguage} from '@/lib/language-context'

const stats = [
    {value: 150, suffix: '+', labelKey: 'stats.projects'},
    {value: 50, suffix: '+', labelKey: 'stats.models'},
    {value: 10, suffix: 'K+', labelKey: 'stats.hours'},
    {value: 98, suffix: '%', labelKey: 'stats.retention'},
]

function StatCard({stat, counted}: {stat: typeof stats[0]; counted: string}) {
    const {t} = useLanguage()
    const label = t(stat.labelKey)
    const [display, setDisplay] = useState(label)
    const [hovering, setHovering] = useState(false)
    useEffect(() => {setDisplay(label)}, [label])
    useEffect(() => {
        if (!hovering) {setDisplay(label); return}
        let frame = 0; const max = 10
        const interval = setInterval(() => { frame++; if (frame >= max) {clearInterval(interval); setDisplay(label); return}; const reveal = Math.floor((frame / max) * label.length); setDisplay(label.split('').map((c, i) => c === ' ' ? ' ' : i < reveal ? label[i] : Math.random() > 0.5 ? '1' : '0').join('')) }, 45)
        return () => clearInterval(interval)
    }, [hovering, label])
    return (
        <div className="relative overflow-hidden group cursor-default" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <div className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out"/>
            <div className="relative z-10 py-12 text-center">
                <div className="mb-3">
                    <span className="stat-number text-5xl md:text-6xl font-vcr text-black group-hover:text-white transition-colors duration-300" data-count={stat.value}>{counted}</span>
                    <span className="text-2xl md:text-3xl font-vcr text-black/50 group-hover:text-white/50 transition-colors duration-300">{stat.suffix}</span>
                </div>
                <p className="text-xs text-black/40 group-hover:text-white/50 font-vcr-mono uppercase tracking-wider transition-colors duration-300">{display}</p>
            </div>
        </div>
    )
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const {lang} = useLanguage()
    const [counted, setCounted] = useState<string[]>(stats.map(() => '0'))

    useEffect(() => {
        if (typeof window === 'undefined') return
        const load = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            if (!sectionRef.current) return
            gsap.fromTo(sectionRef.current, {filter: 'blur(8px)', opacity: 0}, {filter: 'blur(0px)', opacity: 1, duration: 0.8, scrollTrigger: {trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none'}})
            stats.forEach((stat, idx) => {
                const obj = {val: 0}
                ScrollTrigger.create({trigger: sectionRef.current, start: 'top 85%', once: true,
                    onEnter: () => { gsap.to(obj, {val: stat.value, duration: 2, ease: 'power2.out', onUpdate: () => { setCounted(prev => {const n = [...prev]; n[idx] = Math.round(obj.val).toString(); return n}) }}) }})
            })
        }
        load()
    }, [])

    return (
        <section ref={sectionRef} className="bg-white text-black" data-nav-theme="light">
            <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28">
                <div className="border-b border-black/15 pb-12 mb-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                        <div className="md:border-r border-black/15 md:pr-12">
                            <p className="text-[10px] font-vcr-mono uppercase tracking-[0.25em] text-black/40 mb-3">{lang === 'it' ? 'Numeri' : 'Numbers'}</p>
                            <h2 className="text-3xl md:text-5xl font-vcr-mono" style={{fontWeight: 500}}>{lang === 'it' ? 'I nostri risultati' : 'Our results'}</h2>
                        </div>
                        <div className="text-[13px] text-black/50 leading-relaxed md:pl-12 md:pt-2">
                            {lang === 'it' ? 'Numeri che parlano da soli. Ogni progetto è una storia di trasformazione, efficienza e crescita concreta.' : 'Numbers that speak for themselves. Every project is a story of transformation, efficiency and real growth.'}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <div key={stat.labelKey} className={`${i < stats.length - 1 ? 'md:border-r border-black/15' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-black/15' : ''}`}>
                            <StatCard stat={stat} counted={counted[i]}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
