'use client'
import React, {useEffect, useRef} from 'react'
import {TextEffect} from "@/components/motion-primitives/text-effect";

const services = [
    {
        number: '01',
        title: 'AI Chatbots',
        desc: 'Conversational AI for websites, WhatsApp, and other channels. Handle support, qualify leads, book appointments, and engage customers 24/7.',
    },
    {
        number: '02',
        title: 'AI Voice Agents',
        desc: 'Voice AI for inbound and outbound calls, phone automation, call routing, and voice-based customer service.',
    },
    {
        number: '03',
        title: 'RAG / Knowledge AI',
        desc: 'AI systems connected to your documents and knowledge bases. Answers grounded in real internal information, not guesswork.',
    },
    {
        number: '04',
        title: 'Custom GPTs',
        desc: 'Specialized AI assistants tailored to your business, role, or workflow with custom behavior, prompts, and expertise.',
    },
    {
        number: '05',
        title: 'White-Label AI',
        desc: 'Branded AI platforms that agencies or businesses can resell as their own SaaS products.',
    },
    {
        number: '06',
        title: 'RPA & Automation',
        desc: 'Automate repetitive tasks, reduce manual work, and improve efficiency through software bots and workflow design.',
    },
    {
        number: '07',
        title: 'CRM & ERP',
        desc: 'Connect systems like CRM, ERP, sales, marketing, and service platforms into one seamless flow.',
    },
    {
        number: '08',
        title: 'Web Development',
        desc: 'Modern, high-performing websites, portals, and web apps aligned to your business goals.',
    },
    {
        number: '09',
        title: 'SEO & Local SEO',
        desc: 'Improve visibility in search and local map results through technical SEO, content strategy, and Google Business optimization.',
    },
    {
        number: '10',
        title: 'E-commerce',
        desc: 'Online stores focused on conversion, user experience, and revenue growth.',
    },
    {
        number: '11',
        title: 'ML, BI & Data',
        desc: 'Turn data into dashboards, forecasts, models, and decision-making systems with robust data infrastructure.',
    },
    {
        number: '12',
        title: 'Email Marketing',
        desc: 'Email systems, campaigns, automations, and deliverability setups that drive engagement and revenue.',
    },
    {
        number: '13',
        title: 'AI Training',
        desc: 'Train your teams to adopt AI tools properly, improve usage, and build internal AI capability.',
    },
    {
        number: '14',
        title: 'GoHighLevel',
        desc: 'Launch and scale branded marketing automation platforms using GoHighLevel white-label solutions.',
    },
]

export default function ServicesDetail() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const loadGsap = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            if (!sectionRef.current) return

            // Section bg transition: fade to slightly lighter
            gsap.fromTo(
                sectionRef.current,
                {backgroundColor: '#0a0a0a'},
                {
                    backgroundColor: '#0f0f0f',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        end: 'top 20%',
                        scrub: true,
                    },
                }
            )

            // Stagger card animations
            const cards = sectionRef.current.querySelectorAll('.detail-card')
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {y: 40, opacity: 0},
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                        delay: (i % 3) * 0.1,
                    }
                )
            })
        }
        loadGsap()
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32" id="capabilities">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">Capabilities</p>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        End-to-end solutions
                    </TextEffect>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.number}
                            className="detail-card group relative rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>

                            <span className="font-mono text-xs text-white/20 tracking-wider">{service.number}</span>
                            <h4 className="text-lg font-semibold mt-2 mb-3">{service.title}</h4>
                            <p className="text-sm text-white/40 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
