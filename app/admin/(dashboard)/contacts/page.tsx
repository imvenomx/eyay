import React from 'react'
import {listContacts} from '@/lib/store'

export const dynamic = 'force-dynamic'

function formatDate(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

export default async function ContactsPage() {
    const contacts = await listContacts()

    return (
        <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">Inbox</p>
            <h1 className="text-3xl md:text-5xl font-vcr leading-tight mb-2" style={{fontWeight: 900}}>
                Richieste Contatto
            </h1>
            <p className="text-sm text-white/50 mb-10">
                {contacts.length === 0 ? 'Nessuna richiesta ricevuta.' : `${contacts.length} totale${contacts.length !== 1 ? '' : ''}`}
            </p>

            {contacts.length === 0 ? (
                <EmptyState/>
            ) : (
                <div className="space-y-3">
                    {contacts.map(c => (
                        <article key={c.id} className="relative border border-white/10 bg-[#0a0a0a] p-6 hover:border-white/20 transition-colors">
                            <span className="absolute top-0 left-0 w-3 h-px bg-white/30"/>
                            <span className="absolute top-0 left-0 w-px h-3 bg-white/30"/>
                            <span className="absolute top-0 right-0 w-3 h-px bg-white/30"/>
                            <span className="absolute top-0 right-0 w-px h-3 bg-white/30"/>
                            <span className="absolute bottom-0 left-0 w-3 h-px bg-white/30"/>
                            <span className="absolute bottom-0 left-0 w-px h-3 bg-white/30"/>
                            <span className="absolute bottom-0 right-0 w-3 h-px bg-white/30"/>
                            <span className="absolute bottom-0 right-0 w-px h-3 bg-white/30"/>

                            <header className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                    <h2 className="font-vcr text-lg">{c.name}</h2>
                                    {c.company && (
                                        <span className="text-xs font-mono uppercase tracking-wider text-white/40">
                                            // {c.company}
                                        </span>
                                    )}
                                </div>
                                <time className="text-[10px] font-mono uppercase tracking-wider text-white/30">
                                    {formatDate(c.createdAt)}
                                </time>
                            </header>

                            <div className="flex flex-wrap gap-3 mb-4">
                                <a href={`mailto:${c.email}?subject=Re: la tua richiesta su Eey Aay`}
                                   className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors">
                                    <span className="w-1 h-1 rounded-full bg-green-500"/>
                                    {c.email}
                                </a>
                            </div>

                            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{c.message}</p>

                            <footer className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3">
                                <a
                                    href={`mailto:${c.email}?subject=Re: la tua richiesta su Eey Aay`}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white/60 hover:text-white hover:border-white/40 transition-colors">
                                    Rispondi →
                                </a>
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">
                                    ID: {c.id.slice(0, 8)}
                                </span>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

function EmptyState() {
    return (
        <div className="relative border border-dashed border-white/15 bg-[#0a0a0a]/50 p-12 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">// Inbox vuota</p>
            <p className="font-vcr text-2xl mb-2">Nessuna richiesta finora</p>
            <p className="text-xs font-mono text-white/40 max-w-md mx-auto">
                Quando qualcuno invierà il form di contatto del sito apparirà qui.
            </p>
        </div>
    )
}
