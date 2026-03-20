'use client'
import React, {useEffect, useRef} from 'react'
import {TextEffect} from "@/components/motion-primitives/text-effect";

const steps = [
    {
        number: '01',
        title: 'Discover',
        desc: 'We learn your business, identify pain points, and map opportunities where AI and automation can drive measurable impact.',
    },
    {
        number: '02',
        title: 'Design',
        desc: 'We architect the right solution — choosing technologies, defining workflows, and planning integrations tailored to your needs.',
    },
    {
        number: '03',
        title: 'Build',
        desc: 'We develop, test, and deploy your solution with precision — from AI models to integrations to user-facing experiences.',
    },
    {
        number: '04',
        title: 'Scale',
        desc: 'We optimize performance, expand capabilities, and ensure your systems grow alongside your business.',
    },
]

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const loadGsap = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            if (!sectionRef.current) return

            // Section bg transition back to dark
            gsap.fromTo(
                sectionRef.current,
                {backgroundColor: '#0f0f0f'},
                {
                    backgroundColor: '#060606',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        end: 'top 20%',
                        scrub: true,
                    },
                }
            )

            // Stagger step animations with line draw
            const stepEls = sectionRef.current.querySelectorAll('.process-step')
            stepEls.forEach((step, i) => {
                gsap.fromTo(
                    step,
                    {y: 30, opacity: 0},
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: step,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                )

                // Animate the top line
                const line = step.querySelector('.step-line')
                if (line) {
                    gsap.fromTo(
                        line,
                        {scaleX: 0},
                        {
                            scaleX: 1,
                            duration: 0.6,
                            delay: i * 0.15 + 0.3,
                            scrollTrigger: {
                                trigger: step,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                            },
                        }
                    )
                }
            })
        }
        loadGsap()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32 border-t border-white/5" id="process">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">Process</p>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        How we work
                    </TextEffect>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="process-step relative pt-8">
                            {/* Top accent line */}
                            <div
                                className="step-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/40 to-transparent origin-left"/>

                            <span className="font-mono text-5xl font-bold text-white/[0.04] leading-none block mb-4"
                                  style={{WebkitTextStroke: '1px rgba(255,255,255,0.1)'}}
                            >
                                {step.number}
                            </span>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
