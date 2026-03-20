'use client'
import React, {useEffect, useRef} from 'react'
import {TextEffect} from "@/components/motion-primitives/text-effect";

export default function SplineRobotSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const loadGsap = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            if (!sectionRef.current) return

            // Parallax the robot container
            const robotEl = sectionRef.current.querySelector('.robot-container')
            if (robotEl) {
                gsap.fromTo(
                    robotEl,
                    {y: 60, scale: 0.95},
                    {
                        y: -20,
                        scale: 1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    }
                )
            }

            // Fade in text
            const textEls = sectionRef.current.querySelectorAll('.fade-in-text')
            textEls.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    {y: 30, opacity: 0},
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            })
        }
        loadGsap()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-32 overflow-hidden bg-black border-t border-white/5"
        >
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text side */}
                    <div>
                        <p className="fade-in-text text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
                            Il tuo Partner AI
                        </p>
                        <TextEffect
                            triggerOnView
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h2"
                            className="text-balance text-4xl font-semibold lg:text-5xl mb-6 font-vcr-mono">
                            Intelligenza, costruita per il business
                        </TextEffect>
                        <p className="fade-in-text text-white/50 text-lg leading-relaxed mb-8">
                            Eey Aay aiuta le aziende a utilizzare AI e automazione in modi pratici e orientati ai ricavi. Costruiamo chatbot intelligenti, agenti vocali, sistemi AI basati sulla conoscenza, automazioni dei workflow, integrazioni CRM, siti web e soluzioni dati che semplificano le operazioni.
                        </p>
                        <p className="fade-in-text text-white/50 text-lg leading-relaxed">
                            Dalla generazione di lead al supporto clienti all'ottimizzazione dei processi interni, creiamo sistemi che risparmiano tempo, riducono i costi e scalano con il tuo business.
                        </p>
                    </div>

                    {/* Robot side */}
                    <div className="robot-container relative h-[500px] md:h-[600px]">
                        {/* @ts-ignore */}
                        <spline-viewer
                            url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
                            style={{width: '100%', height: '100%'}}
                        />
                        {/* Gradient overlay to blend edges */}
                        <div
                            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"/>
                        <div
                            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/30 via-transparent to-black/30"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
