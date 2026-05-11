'use client'
import React from 'react'

export default function ExportCsvButton({records}: {records: {email: string; createdAt: string}[]}) {
    const handleExport = () => {
        const header = 'email,createdAt\n'
        const rows = records
            .map(r => `${r.email.replace(/"/g, '""')},${r.createdAt}`)
            .join('\n')
        const blob = new Blob([header + rows], {type: 'text/csv;charset=utf-8'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <button
            onClick={handleExport}
            className="relative px-5 py-2.5 cursor-pointer group border border-white/15 hover:border-white/40 transition-colors">
            <span className="absolute top-0 left-0 w-2.5 h-px bg-white/40"/>
            <span className="absolute top-0 left-0 w-px h-2.5 bg-white/40"/>
            <span className="absolute top-0 right-0 w-2.5 h-px bg-white/40"/>
            <span className="absolute top-0 right-0 w-px h-2.5 bg-white/40"/>
            <span className="absolute bottom-0 left-0 w-2.5 h-px bg-white/40"/>
            <span className="absolute bottom-0 left-0 w-px h-2.5 bg-white/40"/>
            <span className="absolute bottom-0 right-0 w-2.5 h-px bg-white/40"/>
            <span className="absolute bottom-0 right-0 w-px h-2.5 bg-white/40"/>
            <span className="font-vcr text-[11px] uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors">
                Esporta CSV ↓
            </span>
        </button>
    )
}
