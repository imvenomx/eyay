'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BinaryHover from '@/components/binary-hover'

const serviceImages = ['/img1.webp', '/img2.webp', '/img3.webp']

function getImageForBlock(serviceTitle: string, blockIndex: number): string {
    let hash = 0
    for (let i = 0; i < serviceTitle.length; i++) { hash = ((hash << 5) - hash) + serviceTitle.charCodeAt(i); hash |= 0 }
    return serviceImages[(Math.abs(hash) + blockIndex) % serviceImages.length]
}

interface ServiceBlock { title: string; desc: string; points: string[]; imageColor: string }
interface FaqItem { q: string; a: string }
interface ServicePageData { breadcrumb: string; headline: string; intro: string; blocks: ServiceBlock[]; relatedServices: { title: string; href: string }[]; faq?: FaqItem[] }

function FaqAccordion({item, index}: { item: FaqItem; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`border-b border-black/15 ${index === 0 ? 'border-t' : ''}`}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 px-2 text-left cursor-pointer group"
            >
                <span className="text-base md:text-xl font-vcr text-black/80 group-hover:text-black transition-colors pr-4">
                    {item.q}
                </span>
                <span className="shrink-0 w-6 h-6 flex items-center justify-center">
                    {/* Crosshair +/- icon */}
                    <span className="relative w-3 h-3">
                        <span className="absolute top-1/2 left-0 w-full h-px bg-black/40 -translate-y-1/2"/>
                        <span className={`absolute left-1/2 top-0 w-px h-full bg-black/40 -translate-x-1/2 transition-transform duration-300 ${open ? 'scale-y-0' : 'scale-y-100'}`}/>
                    </span>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                <p className="text-sm text-black/50 leading-relaxed px-2">{item.a}</p>
            </div>
        </div>
    )
}

export default function ServicePage({data}: { data: ServicePageData }) {
    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="mx-4 md:mx-8 lg:mx-12 border-l border-r border-black/15">

                {/* ── Breadcrumb + Headline ── */}
                <div className="px-6 md:px-12 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-20 border-b border-black/15">
                    <div className="flex items-center gap-2 text-xs font-mono text-black/40 uppercase tracking-wider mb-8">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/#services" className="hover:text-black transition-colors">Servizi</Link>
                        <span>/</span>
                        <span className="text-black/70">{data.breadcrumb}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                        <div className="md:border-r border-black/15 md:pr-12">
                            <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                            <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr-mono" style={{fontWeight: 500}}>{data.headline}</h1>
                        </div>
                        <div className="text-sm text-black/50 leading-relaxed md:pl-12 md:pt-2">{data.intro}</div>
                    </div>
                </div>

                {/* ── Content blocks ── */}
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
                                            <li key={pi} className={`py-3 pl-4 text-sm text-black/60 font-mono ${pi < block.points.length - 1 ? 'border-b border-black/10' : ''}`}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* ── FAQ Section with crosshair borders ── */}
                {data.faq && data.faq.length > 0 && (
                    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 border-b border-black/15">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 mb-12">
                            <div className="md:border-r border-black/15 md:pr-12">
                                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">FAQ</p>
                                <h3 className="text-2xl md:text-3xl font-vcr-mono">Domande Frequenti</h3>
                            </div>
                            <div className="text-[13px] text-black/50 leading-relaxed md:pl-12 md:pt-2">
                                Le risposte alle domande più comuni su questo servizio. Non trovi quello che cerchi? Contattaci.
                            </div>
                        </div>
                        <div>
                            {data.faq.map((item, i) => (
                                <FaqAccordion key={i} item={item} index={i}/>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Related services ── */}
                <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 border-b border-black/15">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">Servizi correlati</p>
                    <h3 className="text-2xl md:text-3xl font-vcr-mono mb-12">Altre competenze</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-black/15">
                        {data.relatedServices.map((svc, i) => (
                            <Link key={i} href={svc.href} className="group relative border-r border-b border-black/15 p-6 md:p-8 overflow-hidden">
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
                        <BinaryHover>CONTATTACI</BinaryHover>
                    </Link>
                </div>

            </div>
        </main>
    )
}
