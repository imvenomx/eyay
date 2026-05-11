import React from 'react'

export default function StatTile({label, value, hint}: {label: string; value: number | string; hint?: string}) {
    return (
        <div className="bg-[#0a0a0a] p-6 md:p-7">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">{label}</p>
            <p className="font-vcr text-4xl md:text-5xl leading-none" style={{fontWeight: 900}}>{value}</p>
            {hint && <p className="mt-3 text-[10px] font-mono text-white/30 uppercase tracking-wider">{hint}</p>}
        </div>
    )
}
