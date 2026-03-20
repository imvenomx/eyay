'use client'
import React, {useEffect, useRef} from 'react'
import {TextEffect} from "@/components/motion-primitives/text-effect";
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import {transitionVariants} from "@/lib/utils";

const buckets = [
    {
        number: '01',
        title: 'AI Solutions',
        items: ['AI Chatbots', 'AI Voice Agents', 'RAG / Knowledge AI', 'Custom GPTs', 'White-Label AI Platforms'],
    },
    {
        number: '02',
        title: 'Automation & Systems',
        items: ['RPA & Process Automation', 'CRM / ERP Integration', 'GoHighLevel Setup', 'Email Automation'],
    },
    {
        number: '03',
        title: 'Growth & Digital',
        items: ['Web Development', 'SEO & Local SEO', 'E-commerce Solutions'],
    },
    {
        number: '04',
        title: 'Data & Enablement',
        items: ['BI Dashboards', 'Machine Learning', 'Data Infrastructure', 'AI Training'],
    },
]

export default function ServicesOverview() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const loadGsap = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            if (!sectionRef.current) return

            // Animate section background
            gsap.fromTo(
                sectionRef.current,
                {backgroundColor: 'rgba(10,10,10,0)'},
                {
                    backgroundColor: 'rgba(10,10,10,1)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: true,
                    },
                }
            )

            // Animate each bucket card
            const cards = sectionRef.current.querySelectorAll('.service-bucket')
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {y: 40, opacity: 0},
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                    }
                )
            })
        }
        loadGsap()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32 border-t border-white/5" id="services">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">Services</p>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        What we build
                    </TextEffect>
                </div>

                <AnimatedGroup
                    triggerOnView
                    variants={{
                        container: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.75,
                                },
                            },
                        },
                        ...transitionVariants,
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0"
                >
                    {buckets.map((bucket) => (
                        <div
                            key={bucket.number}
                            className="service-bucket group relative p-8 border-l border-white/5 first:border-l-0 md:first:border-l md:[&:nth-child(odd)]:border-l-0 lg:[&:nth-child(odd)]:border-l lg:first:border-l-0 hover:bg-white/[0.02] transition-colors duration-500"
                        >
                            <span className="font-mono text-xs text-white/30 tracking-wider">{bucket.number}</span>
                            <h3 className="text-xl font-semibold mt-3 mb-6">{bucket.title}</h3>
                            <ul className="space-y-0">
                                {bucket.items.map((item) => (
                                    <li
                                        key={item}
                                        className="py-2.5 border-b border-white/5 text-sm text-white/50 hover:text-white hover:pl-2 transition-all duration-300"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {/* Bottom accent line on hover */}
                            <div
                                className="absolute bottom-0 left-8 right-8 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                        </div>
                    ))}
                </AnimatedGroup>
            </div>
        </section>
    )
}
