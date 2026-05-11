import type {Metadata} from 'next'
import Link from 'next/link'
import BinaryHover from '@/components/binary-hover'
import {listPublishedCaseStudies, type CaseStudyRecord} from '@/lib/store'
import {siteOgImage} from '@/lib/site'

export const dynamic = 'force-dynamic'

const CASE_STUDIES_OG = siteOgImage({title: 'Case Studies', subtitle: 'Progetti reali, risultati misurabili', eyebrow: 'Case Studies // Eey Aay'})

export const metadata: Metadata = {
    title: 'Case Studies — Eey Aay',
    description: 'Progetti reali, risultati misurabili. Casi studio di AI, automazione e crescita per aziende italiane.',
    alternates: {canonical: '/case-studies'},
    openGraph: {
        title: 'Case Studies — Eey Aay',
        description: 'Progetti reali, risultati misurabili.',
        images: [{url: CASE_STUDIES_OG, width: 1200, height: 630}],
        locale: 'it_IT',
    },
}

function formatDate(iso: string | null): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('it-IT', {month: 'short', year: 'numeric'})
}

export default async function CaseStudiesIndexPage() {
    const studies = await listPublishedCaseStudies()

    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-20 md:pt-36 md:pb-28">
                {/* Heading */}
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">Case Studies // Lavoro reale</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
                    <div className="md:col-span-7">
                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-1.5"/>
                        <h1 className="text-4xl md:text-6xl leading-[1.05] inline font-vcr" style={{fontWeight: 900}}>
                            Progetti reali,<br/>risultati misurabili.
                        </h1>
                    </div>
                    <div className="md:col-span-5 md:pt-3">
                        <p className="text-sm text-black/55 leading-relaxed">
                            Ogni progetto inizia con un problema concreto e finisce con numeri che si possono misurare.
                            Qui trovi cosa abbiamo costruito, per chi, e cosa è cambiato.
                        </p>
                    </div>
                </div>

                {studies.length === 0 ? (
                    <EmptyState/>
                ) : (
                    <div className="space-y-px bg-black/10 border border-black/10">
                        {studies.map(s => <CaseStudyRow key={s.id} study={s}/>)}
                    </div>
                )}
            </div>
        </main>
    )
}

function CaseStudyRow({study}: {study: CaseStudyRecord}) {
    return (
        <Link
            href={`/case-studies/${study.slug}`}
            className="group block bg-white hover:bg-black/[0.02] transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 px-7 md:px-10 py-10 md:py-12 relative">
                {/* Crosshair corners on hover */}
                <span className="absolute top-0 left-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute top-0 left-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute top-0 right-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute top-0 right-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute bottom-0 left-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute bottom-0 left-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute bottom-0 right-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <span className="absolute bottom-0 right-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>

                {/* Left: client + meta */}
                <div className="md:col-span-3">
                    {study.clientLogo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={study.clientLogo} alt={study.client}
                             className="h-10 w-auto mb-5 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all"/>
                    ) : (
                        <p className="font-vcr text-sm uppercase tracking-wider mb-5">{study.client}</p>
                    )}
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-1">{study.industry}</p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/30">
                        {formatDate(study.publishedAt)}
                    </p>
                </div>

                {/* Middle: title + excerpt */}
                <div className="md:col-span-6">
                    <h2 className="font-vcr text-2xl md:text-3xl leading-tight mb-3" style={{fontWeight: 900}}>
                        <BinaryHover>{study.title}</BinaryHover>
                    </h2>
                    <p className="text-sm text-black/55 leading-relaxed line-clamp-3">{study.excerpt}</p>
                </div>

                {/* Right: metrics teaser */}
                <div className="md:col-span-3 flex flex-col justify-between gap-4">
                    {study.metrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                            <p className="font-vcr text-2xl md:text-3xl leading-none" style={{fontWeight: 900}}>{m.value}</p>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-black/45 mt-1">{m.label}</p>
                        </div>
                    ))}
                    <span className="font-vcr text-[10px] uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors md:text-right">
                        Leggi il caso →
                    </span>
                </div>
            </div>
        </Link>
    )
}

function EmptyState() {
    return (
        <div className="relative border border-dashed border-black/15 p-12 md:p-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">// Archivio vuoto</p>
            <p className="font-vcr text-2xl md:text-3xl mb-3" style={{fontWeight: 900}}>
                Case studies in arrivo
            </p>
            <p className="text-sm font-mono text-black/40 max-w-md mx-auto">
                Stiamo preparando i primi casi studio pubblici. Nel frattempo, parliamo del tuo progetto.
            </p>
            <Link href="/contact" className="inline-block mt-6 px-5 py-2 rounded-full border border-black/20 text-xs font-vcr uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Contattaci
            </Link>
        </div>
    )
}
