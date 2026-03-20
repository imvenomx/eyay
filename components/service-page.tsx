'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BinaryHover from '@/components/binary-hover'

const serviceImages = ['/img1.webp', '/img2.webp', '/img3.webp']

function getImageForBlock(serviceTitle: string, blockIndex: number): string {
    let hash = 0
    for (let i = 0; i < serviceTitle.length; i++) {
        hash = ((hash << 5) - hash) + serviceTitle.charCodeAt(i)
        hash |= 0
    }
    const offset = Math.abs(hash) % serviceImages.length
    return serviceImages[(offset + blockIndex) % serviceImages.length]
}

interface ServiceBlock { title: string; desc: string; points: string[]; imageColor: string }
interface ServicePageData { breadcrumb: string; headline: string; intro: string; blocks: ServiceBlock[]; relatedServices: { title: string; href: string }[] }

export default function ServicePage({data}: { data: ServicePageData }) {
    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="border-l border-r border-black/15">

                    {/* ── Breadcrumb + Headline ── */}
                    <div className="px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-20 border-b border-black/15">
                        <div className="flex items-center gap-2 text-xs font-mono text-black/40 uppercase tracking-wider mb-8">
                            <Link href="/" className="hover:text-black transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/#services" className="hover:text-black transition-colors">Servizi</Link>
                            <span>/</span>
                            <span className="text-black/70">{data.breadcrumb}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
                            <div className="md:border-r border-black/15 md:pr-12">
                                <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                                <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr-mono" style={{fontWeight: 500}}>
                                    {data.headline}
                                </h1>
                            </div>
                            <div className="text-sm text-black/50 leading-relaxed md:pt-2">{data.intro}</div>
                        </div>
                    </div>

                    {/* ── Alternating content blocks ── */}
                    {data.blocks.map((block, i) => {
                        const isEven = i % 2 === 0
                        const imgSrc = getImageForBlock(data.breadcrumb, i)
                        return (
                            <div key={i} className="px-6 md:px-12 lg:px-16 py-16 md:py-24 border-b border-black/15">
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? 'md:[direction:rtl]' : ''}`}>
                                    <div className={`aspect-[4/3] rounded-sm overflow-hidden relative ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                                        <Image src={imgSrc} alt={block.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw"/>
                                    </div>
                                    <div className={!isEven ? 'md:[direction:ltr]' : ''}>
                                        <h2 className="text-2xl md:text-3xl font-vcr-mono mb-6 leading-tight">{block.title}</h2>
                                        <p className="text-sm text-black/50 leading-relaxed mb-8">{block.desc}</p>
                                        <ul className="space-y-0">
                                            {block.points.map((point, pi) => (
                                                <li key={pi} className={`py-3 pl-4 text-sm text-black/60 font-mono ${pi < block.points.length - 1 ? 'border-b border-black/10' : ''}`}>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* ── Related services ── */}
                    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 border-b border-black/15">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">Servizi correlati</p>
                        <h3 className="text-2xl md:text-3xl font-vcr-mono mb-12">Altre competenze</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {data.relatedServices.map((svc, i) => (
                                <Link key={i} href={svc.href} className="group relative border border-black/15 p-6 md:p-8 overflow-hidden hover:border-black/20 transition-colors">
                                    <div className="absolute inset-0 bg-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"/>
                                    <span className="relative z-10 text-sm font-vcr group-hover:text-white transition-colors duration-300">
                                        <BinaryHover>{svc.title}</BinaryHover>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ── Bottom CTA ── */}
                    <div className="px-6 md:px-12 lg:px-16 py-20 md:py-28 text-center">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-4">Pronto?</p>
                        <h3 className="text-3xl md:text-4xl font-vcr-mono mb-8">Iniziamo a costruire</h3>
                        <Link href="/contact" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black text-white text-xs tracking-wider hover:bg-black/80 transition-all duration-300 font-vcr-mono">
                            CONTATTACI
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    )
}
