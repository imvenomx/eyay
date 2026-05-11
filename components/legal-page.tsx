import React from 'react'
import Link from 'next/link'

interface LegalSection {
    heading: string
    body: React.ReactNode
}

export interface LegalPageProps {
    eyebrow: string
    title: string
    lastUpdated: string
    intro: string
    sections: LegalSection[]
}

export default function LegalPage({eyebrow, title, lastUpdated, intro, sections}: LegalPageProps) {
    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-20 md:pt-36 md:pb-28">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">{eyebrow}</p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                    {/* Heading */}
                    <div className="md:col-span-5">
                        <div>
                            <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                            <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr" style={{fontWeight: 900}}>
                                {title}
                            </h1>
                        </div>
                        <p className="text-sm text-black/55 leading-relaxed mt-8 mb-6">{intro}</p>
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 border-t border-black/10 pt-6">
                            Ultimo aggiornamento · {lastUpdated}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="md:col-span-7 md:border-l border-black/10 md:pl-12 space-y-10">
                        {sections.map((s, i) => (
                            <section key={i}>
                                <div className="flex items-baseline gap-4 mb-4">
                                    <span className="font-vcr text-[10px] uppercase tracking-[0.25em] text-black/40">
                                        §{String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h2 className="text-xl md:text-2xl font-vcr leading-tight">{s.heading}</h2>
                                </div>
                                <div className="text-sm text-black/65 leading-relaxed space-y-3">
                                    {s.body}
                                </div>
                            </section>
                        ))}

                        <div className="pt-6 border-t border-black/10">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-black/20 text-xs tracking-wider hover:bg-black hover:text-white transition-all duration-300 font-vcr">
                                Hai domande? Contattaci →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
