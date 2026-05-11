import React from 'react'
import {listNewsletter} from '@/lib/store'
import ExportCsvButton from './export-csv-button'

export const dynamic = 'force-dynamic'

function formatDate(iso: string): string {
    return new Date(iso).toLocaleString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

export default async function NewsletterPage() {
    const records = await listNewsletter()

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">Subscribers</p>
                    <h1 className="text-3xl md:text-5xl font-vcr leading-tight mb-2" style={{fontWeight: 900}}>
                        Newsletter
                    </h1>
                    <p className="text-sm text-white/50">
                        {records.length} email iscritte
                    </p>
                </div>
                {records.length > 0 && (
                    <ExportCsvButton records={records.map(r => ({email: r.email, createdAt: r.createdAt}))}/>
                )}
            </div>

            {records.length === 0 ? (
                <div className="relative border border-dashed border-white/15 bg-[#0a0a0a]/50 p-12 text-center">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">// Lista vuota</p>
                    <p className="font-vcr text-2xl mb-2">Nessun iscritto finora</p>
                    <p className="text-xs font-mono text-white/40 max-w-md mx-auto">
                        Le email raccolte dal footer del sito appariranno qui.
                    </p>
                </div>
            ) : (
                <div className="relative border border-white/10 bg-[#0a0a0a]">
                    <span className="absolute top-0 left-0 w-3 h-px bg-white/30"/>
                    <span className="absolute top-0 left-0 w-px h-3 bg-white/30"/>
                    <span className="absolute top-0 right-0 w-3 h-px bg-white/30"/>
                    <span className="absolute top-0 right-0 w-px h-3 bg-white/30"/>
                    <span className="absolute bottom-0 left-0 w-3 h-px bg-white/30"/>
                    <span className="absolute bottom-0 left-0 w-px h-3 bg-white/30"/>
                    <span className="absolute bottom-0 right-0 w-3 h-px bg-white/30"/>
                    <span className="absolute bottom-0 right-0 w-px h-3 bg-white/30"/>

                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-6 py-4 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Email</th>
                                <th className="text-right px-6 py-4 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Iscritto il</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map(r => (
                                <tr key={r.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-3 text-sm font-mono text-white/80">{r.email}</td>
                                    <td className="px-6 py-3 text-xs font-mono text-white/40 text-right whitespace-nowrap">
                                        {formatDate(r.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
