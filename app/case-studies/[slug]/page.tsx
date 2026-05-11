import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import BinaryHover from '@/components/binary-hover'
import MarkdownContent from '@/components/markdown-content'
import JsonLd from '@/components/json-ld'
import {
    getPublishedCaseStudyBySlug,
    listPublishedCaseStudies,
    POST_CATEGORY_LABEL,
    type CaseStudyRecord,
} from '@/lib/store'
import {breadcrumbSchema} from '@/lib/schemas'
import {SITE_NAME, SITE_URL, absoluteUrl} from '@/lib/site'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{slug: string}>
}

function formatDate(iso: string | null): string {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('it-IT', {day: 'numeric', month: 'long', year: 'numeric'})
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {slug} = await params
    const study = await getPublishedCaseStudyBySlug(slug)
    if (!study) return {title: 'Case study non trovato'}
    const dynamicOg = `/api/og/post?title=${encodeURIComponent(study.title)}&cat=${encodeURIComponent('Case Study')}&date=${encodeURIComponent(study.publishedAt?.slice(0, 10) || '')}`
    const ogImage = study.coverImage || dynamicOg
    return {
        title: `${study.title} — ${SITE_NAME}`,
        description: study.excerpt,
        alternates: {canonical: `/case-studies/${study.slug}`},
        openGraph: {
            type: 'article',
            title: study.title,
            description: study.excerpt,
            locale: 'it_IT',
            publishedTime: study.publishedAt || undefined,
            images: [{url: ogImage, width: 1200, height: 630, alt: study.title}],
        },
        twitter: {
            card: 'summary_large_image',
            title: study.title,
            description: study.excerpt,
            images: [ogImage],
        },
    }
}

function caseStudySchema(study: CaseStudyRecord) {
    const url = absoluteUrl(`/case-studies/${study.slug}`)
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: study.title,
        description: study.excerpt,
        url,
        datePublished: study.publishedAt || study.createdAt,
        dateModified: study.updatedAt,
        about: study.industry,
        creator: {'@type': 'Organization', name: SITE_NAME, url: SITE_URL},
        image: study.coverImage ? [study.coverImage] : [absoluteUrl('/ogimg.png')],
        inLanguage: 'it-IT',
    }
}

async function getRelated(study: CaseStudyRecord): Promise<CaseStudyRecord[]> {
    const all = await listPublishedCaseStudies()
    return all.filter(s => s.id !== study.id).slice(0, 2)
}

export default async function CaseStudyDetailPage({params}: PageProps) {
    const {slug} = await params
    const study = await getPublishedCaseStudyBySlug(slug)
    if (!study) notFound()

    const related = await getRelated(study)
    const breadcrumbs = breadcrumbSchema([
        {name: 'Home', url: absoluteUrl('/')},
        {name: 'Case Studies', url: absoluteUrl('/case-studies')},
        {name: study.title, url: absoluteUrl(`/case-studies/${study.slug}`)},
    ])

    return (
        <main className="bg-white text-black" data-nav-theme="light">
            <JsonLd data={caseStudySchema(study)}/>
            <JsonLd data={breadcrumbs}/>

            {/* Header */}
            <article className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-16 md:pt-36 md:pb-20">
                <nav aria-label="Breadcrumb" className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-10">
                    <Link href="/case-studies" className="hover:text-black transition-colors">Case Studies</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black/60">{study.industry}</span>
                </nav>

                <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12">
                    <div className="md:col-span-8">
                        <div className="flex items-center gap-4 mb-6">
                            {study.clientLogo && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={study.clientLogo} alt={study.client} className="h-8 w-auto"/>
                            )}
                            <p className="font-vcr text-sm uppercase tracking-wider">{study.client}</p>
                        </div>
                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-1.5"/>
                        <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr" style={{fontWeight: 900}}>
                            {study.title}
                        </h1>
                        <p className="text-base md:text-lg text-black/65 leading-relaxed mt-8">{study.excerpt}</p>
                    </div>
                    <aside className="md:col-span-4 md:border-l border-black/10 md:pl-8">
                        <dl className="space-y-5 text-xs">
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Cliente</dt>
                                <dd className="font-vcr text-sm">{study.client}</dd>
                            </div>
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Settore</dt>
                                <dd className="font-mono text-sm text-black/70">{study.industry}</dd>
                            </div>
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Pubblicato</dt>
                                <dd className="font-mono text-sm text-black/70">{formatDate(study.publishedAt)}</dd>
                            </div>
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Categoria</dt>
                                <dd>
                                    <span className="inline-block px-3 py-1 rounded-full border border-black/15 text-[10px] font-mono uppercase tracking-wider">
                                        {POST_CATEGORY_LABEL[study.category]}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </aside>
                </header>

                {/* Metrics */}
                {study.metrics.length > 0 && (
                    <section aria-label="Risultati" className="mb-16">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-5">// Risultati</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
                            {study.metrics.map((m, i) => (
                                <div key={i} className="bg-white p-6 md:p-7 relative">
                                    <span className="absolute top-0 left-0 w-3 h-px bg-black/30"/>
                                    <span className="absolute top-0 left-0 w-px h-3 bg-black/30"/>
                                    <p className="font-vcr text-3xl md:text-5xl leading-none mb-3" style={{fontWeight: 900}}>{m.value}</p>
                                    <p className="text-xs font-vcr uppercase tracking-wider text-black/70">{m.label}</p>
                                    {m.hint && (
                                        <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-black/40">{m.hint}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Cover image */}
                {study.coverImage && (
                    <div className="mb-12 border border-black/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={study.coverImage} alt={study.title} className="w-full h-auto"/>
                    </div>
                )}

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-8 md:col-start-3">
                        <MarkdownContent source={study.body}/>
                    </div>
                </div>
            </article>

            {/* CTA */}
            <section className="bg-black text-white">
                <div className="w-full border-l border-r border-white/10 px-8 md:px-16 lg:px-20 py-20 md:py-28">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-7">
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-6">
                                Hai un progetto simile?
                            </p>
                            <h2 className="text-3xl md:text-5xl font-vcr leading-[1.1] mb-6" style={{fontWeight: 900}}>
                                Costruiamo il tuo prossimo case study.
                            </h2>
                            <p className="text-base text-white/60 leading-relaxed max-w-xl">
                                Partiamo da una chiamata di scoperta. Capiamo il problema, mappiamo la soluzione, ti diamo una stima onesta.
                            </p>
                        </div>
                        <div className="md:col-span-5 flex md:items-end md:justify-end">
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-vcr uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
                                    <BinaryHover>Parliamone</BinaryHover>
                                    <span>→</span>
                                </Link>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-xs font-vcr uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/50 transition-colors">
                                    Altri case
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related */}
            {related.length > 0 && (
                <section className="bg-white text-black">
                    <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 py-16 md:py-24">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">Altri lavori</p>
                        <h2 className="text-2xl md:text-4xl font-vcr leading-tight mb-10" style={{fontWeight: 900}}>
                            Continua a esplorare
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
                            {related.map(s => (
                                <Link key={s.id} href={`/case-studies/${s.slug}`}
                                      className="group bg-white p-6 md:p-8 hover:bg-black/[0.02] transition-colors flex flex-col">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">{s.industry} // {s.client}</p>
                                    <h3 className="font-vcr text-xl leading-tight mb-3 flex-1">
                                        <BinaryHover>{s.title}</BinaryHover>
                                    </h3>
                                    <p className="text-sm text-black/50 leading-relaxed line-clamp-2 mb-4">{s.excerpt}</p>
                                    <span className="font-vcr text-[10px] uppercase tracking-[0.2em] text-black/60 group-hover:text-black transition-colors">
                                        Leggi il caso →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
