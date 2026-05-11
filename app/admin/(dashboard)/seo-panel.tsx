'use client'
import React, {useMemo, useState} from 'react'
import {analyzeSeo, type SeoCheck, type SeoLevel} from '@/lib/seo-rules'
import {SITE_URL} from '@/lib/site'

interface SeoPanelProps {
    title: string
    slug: string
    excerpt: string
    body: string
    coverImage?: string | null
    basePath: '/blog' | '/case-studies'
    /** Called when AI fixes a field — parent updates form state */
    onApplyFix: (field: 'title' | 'excerpt' | 'slug' | 'body', value: string) => void
    /** Optional kind tag for the AI fixer */
    kind?: 'post' | 'case-study'
}

export default function SeoPanel({title, slug, excerpt, body, coverImage, basePath, onApplyFix, kind = 'post'}: SeoPanelProps) {
    const report = useMemo(() => analyzeSeo({title, slug, excerpt, body, coverImage: coverImage || null}), [title, slug, excerpt, body, coverImage])
    const [fixingId, setFixingId] = useState<string | null>(null)
    const [fixError, setFixError] = useState('')

    const url = `${SITE_URL}${basePath}/${slug || 'slug-segnaposto'}`
    const displayTitle = (title || 'Titolo dell\u2019articolo').slice(0, 65)
    const displayDescription = (excerpt || 'L\u2019estratto verrà mostrato qui nella SERP.').slice(0, 160)

    const handleFix = async (check: SeoCheck) => {
        if (!check.fixable || !check.fixField) return
        setFixingId(check.id)
        setFixError('')
        try {
            const res = await fetch('/api/admin/ai-fix', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({field: check.fixField, title, excerpt, slug, body, kind}),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok || !data.value) {
                setFixError(data.error || 'Fix fallito')
                return
            }
            onApplyFix(check.fixField, data.value)
        } catch (e) {
            setFixError(`Errore: ${e instanceof Error ? e.message : 'rete'}`)
        } finally {
            setFixingId(null)
        }
    }

    const grade = report.grade
    const gradeColor = grade === 'A' ? 'text-green-400 border-green-500/50'
        : grade === 'B' ? 'text-emerald-400 border-emerald-500/40'
        : grade === 'C' ? 'text-yellow-400 border-yellow-500/40'
        : grade === 'D' ? 'text-orange-400 border-orange-500/40'
        : 'text-red-400 border-red-500/40'

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: SERP preview + score */}
            <div className="lg:col-span-7 space-y-6">
                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">Anteprima Google</p>
                    <div className="bg-white text-black p-5 md:p-6 border border-white/10">
                        <p className="text-[11px] text-[#202124]/70 font-sans">{url.replace(/^https?:\/\//, '')}</p>
                        <h3 className="text-[#1a0dab] font-sans text-xl md:text-[22px] leading-tight mt-1 hover:underline cursor-pointer">{displayTitle}</h3>
                        <p className="text-[13px] text-[#4d5156] leading-[1.45] mt-1 font-sans">{displayDescription}</p>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">Lunghezze</p>
                    <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">
                        <Stat label="Titolo" value={`${title.length}`} hint="30-65" ok={title.length >= 30 && title.length <= 65}/>
                        <Stat label="Estratto" value={`${excerpt.length}`} hint="120-160" ok={excerpt.length >= 120 && excerpt.length <= 160}/>
                        <Stat label="Parole" value={`${body.trim().split(/\s+/).filter(Boolean).length}`} hint="≥300" ok={body.trim().split(/\s+/).filter(Boolean).length >= 300}/>
                    </div>
                </div>

                {fixError && (
                    <div className="border border-red-500/40 bg-red-500/5 p-3 text-[10px] font-mono text-red-300 uppercase tracking-wider">
                        {fixError}
                    </div>
                )}
            </div>

            {/* Right: score + checklist */}
            <div className="lg:col-span-5 space-y-4">
                <div className={`relative border ${gradeColor} bg-[#0a0a0a] p-5`}>
                    <span className="absolute top-0 left-0 w-3 h-px bg-white/40"/>
                    <span className="absolute top-0 left-0 w-px h-3 bg-white/40"/>
                    <span className="absolute top-0 right-0 w-3 h-px bg-white/40"/>
                    <span className="absolute top-0 right-0 w-px h-3 bg-white/40"/>
                    <span className="absolute bottom-0 left-0 w-3 h-px bg-white/40"/>
                    <span className="absolute bottom-0 left-0 w-px h-3 bg-white/40"/>
                    <span className="absolute bottom-0 right-0 w-3 h-px bg-white/40"/>
                    <span className="absolute bottom-0 right-0 w-px h-3 bg-white/40"/>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">SEO score</p>
                            <p className="font-vcr text-4xl md:text-5xl mt-2" style={{fontWeight: 900}}>
                                {report.score}<span className="text-base text-white/40">/100</span>
                            </p>
                            <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mt-1">
                                {report.passing} / {report.total} check superati
                            </p>
                        </div>
                        <div className={`size-16 border-2 ${gradeColor} flex items-center justify-center font-vcr text-3xl`} style={{fontWeight: 900}}>
                            {grade}
                        </div>
                    </div>
                </div>

                <ul className="space-y-2">
                    {report.checks.map(c => (
                        <CheckRow key={c.id} check={c} onFix={handleFix} fixing={fixingId === c.id}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function Stat({label, value, hint, ok}: {label: string; value: string; hint: string; ok: boolean}) {
    return (
        <div className="bg-[#0a0a0a] p-4 text-center">
            <p className="font-vcr text-2xl" style={{fontWeight: 900}}>{value}</p>
            <p className="text-[9px] font-mono uppercase tracking-wider text-white/40 mt-1">{label}</p>
            <p className={`text-[9px] font-mono uppercase tracking-wider mt-1 ${ok ? 'text-green-400/80' : 'text-yellow-400/70'}`}>
                {ok ? '✓' : '◯'} {hint}
            </p>
        </div>
    )
}

function CheckRow({check, onFix, fixing}: {check: SeoCheck; onFix: (c: SeoCheck) => void; fixing: boolean}) {
    const dot = check.level === 'pass' ? 'bg-green-500'
        : check.level === 'warn' ? 'bg-yellow-400'
        : 'bg-red-500'
    return (
        <li className="relative border border-white/10 bg-[#0a0a0a] p-3 flex items-start gap-3">
            <span className={`mt-1 size-2 rounded-full shrink-0 ${dot}`} aria-hidden="true"/>
            <div className="flex-1 min-w-0">
                <p className="font-vcr text-xs">{check.label}</p>
                <p className="text-[11px] font-mono text-white/55 leading-snug mt-0.5">{check.message}</p>
            </div>
            {check.fixable && check.level !== 'pass' && (
                <button
                    type="button"
                    onClick={() => onFix(check)}
                    disabled={fixing}
                    className="shrink-0 px-2.5 py-1 border border-white/20 hover:border-white/50 text-[9px] font-vcr uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-wait">
                    {fixing ? '…AI' : '✨ Fix AI'}
                </button>
            )}
        </li>
    )
}
