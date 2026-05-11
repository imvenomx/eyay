import React from 'react'
import Link from 'next/link'
import {listAdminCaseStudies, listAdminPosts, listContacts, listNewsletter} from '@/lib/store'
import StatTile from './stat-tile'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
    const [contacts, newsletter, posts, caseStudies] = await Promise.all([
        listContacts(), listNewsletter(), listAdminPosts(), listAdminCaseStudies(),
    ])
    const last7Days = Date.now() - 7 * 24 * 60 * 60 * 1000
    const recentContacts = contacts.filter(c => new Date(c.createdAt).getTime() > last7Days).length
    const recentNewsletter = newsletter.filter(n => new Date(n.createdAt).getTime() > last7Days).length
    const publishedPosts = posts.filter(p => p.published).length
    const draftPosts = posts.length - publishedPosts
    const publishedStudies = caseStudies.filter(s => s.published).length
    const draftStudies = caseStudies.length - publishedStudies

    return (
        <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">Dashboard</p>
            <h1 className="text-3xl md:text-5xl font-vcr leading-tight mb-2" style={{fontWeight: 900}}>
                Panoramica
            </h1>
            <p className="text-sm text-white/50 mb-12">Stato in tempo reale di contatti, iscrizioni e contenuti.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-12">
                <StatTile label="Contatti totali" value={contacts.length} hint={`+${recentContacts} ultimi 7gg`}/>
                <StatTile label="Iscritti newsletter" value={newsletter.length} hint={`+${recentNewsletter} ultimi 7gg`}/>
                <StatTile label="Articoli pubblicati" value={publishedPosts} hint={`${draftPosts} bozze`}/>
                <StatTile label="Case studies" value={publishedStudies} hint={`${draftStudies} bozze`}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuickCard
                    title="Ultime richieste"
                    href="/admin/contacts"
                    cta="Vedi tutti"
                    empty="Nessuna richiesta ricevuta finora.">
                    {contacts.slice(0, 5).map(c => (
                        <div key={c.id} className="py-3 border-b border-white/5 last:border-b-0">
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="text-sm text-white/80 truncate">{c.name}</span>
                                <span className="text-[10px] font-mono text-white/30 whitespace-nowrap">
                                    {new Date(c.createdAt).toLocaleDateString('it-IT')}
                                </span>
                            </div>
                            <p className="text-xs text-white/40 font-mono truncate">{c.email}</p>
                        </div>
                    ))}
                </QuickCard>

                <QuickCard
                    title="Ultime iscrizioni"
                    href="/admin/newsletter"
                    cta="Vedi tutti"
                    empty="Nessuna iscrizione finora.">
                    {newsletter.slice(0, 5).map(n => (
                        <div key={n.id} className="py-3 border-b border-white/5 last:border-b-0">
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="text-sm text-white/80 font-mono truncate">{n.email}</span>
                                <span className="text-[10px] font-mono text-white/30 whitespace-nowrap">
                                    {new Date(n.createdAt).toLocaleDateString('it-IT')}
                                </span>
                            </div>
                        </div>
                    ))}
                </QuickCard>
            </div>
        </div>
    )
}

function QuickCard({title, href, cta, empty, children}: {
    title: string
    href: string
    cta: string
    empty: string
    children: React.ReactNode
}) {
    const hasContent = React.Children.count(children) > 0
    return (
        <div className="relative border border-white/10 bg-[#0a0a0a] p-6">
            <span className="absolute top-0 left-0 w-3 h-px bg-white/30"/>
            <span className="absolute top-0 left-0 w-px h-3 bg-white/30"/>
            <span className="absolute top-0 right-0 w-3 h-px bg-white/30"/>
            <span className="absolute top-0 right-0 w-px h-3 bg-white/30"/>
            <span className="absolute bottom-0 left-0 w-3 h-px bg-white/30"/>
            <span className="absolute bottom-0 left-0 w-px h-3 bg-white/30"/>
            <span className="absolute bottom-0 right-0 w-3 h-px bg-white/30"/>
            <span className="absolute bottom-0 right-0 w-px h-3 bg-white/30"/>

            <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-vcr text-sm uppercase tracking-wider">{title}</h3>
                <Link href={href} className="text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-white transition-colors">
                    {cta} →
                </Link>
            </div>
            {hasContent ? children : (
                <p className="text-xs font-mono text-white/30 py-6 text-center">{empty}</p>
            )}
        </div>
    )
}
