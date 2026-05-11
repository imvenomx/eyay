'use client'
import React, {useState, useCallback, useMemo} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import MarkdownContent from '@/components/markdown-content'
import {slugify} from '@/lib/slugify'
import {
    POST_CATEGORIES, POST_CATEGORY_LABEL,
    type PostCategory,
    type CaseStudyRecord, type CaseStudyMetric,
} from '@/lib/store/types'

type FieldErrors = Partial<Record<'slug' | 'title' | 'client' | 'industry' | 'excerpt' | 'body' | 'category' | 'coverImage' | 'clientLogo' | 'metrics', string>>
type Mode = 'new' | 'edit'

interface FormState {
    title: string
    slug: string
    slugTouched: boolean
    client: string
    industry: string
    excerpt: string
    body: string
    category: PostCategory
    coverImage: string
    clientLogo: string
    metrics: CaseStudyMetric[]
    published: boolean
}

function initialState(initial?: CaseStudyRecord): FormState {
    return {
        title: initial?.title ?? '',
        slug: initial?.slug ?? '',
        slugTouched: !!initial,
        client: initial?.client ?? '',
        industry: initial?.industry ?? '',
        excerpt: initial?.excerpt ?? '',
        body: initial?.body ?? '',
        category: initial?.category ?? 'case-study',
        coverImage: initial?.coverImage ?? '',
        clientLogo: initial?.clientLogo ?? '',
        metrics: initial?.metrics?.length ? initial.metrics : [{label: '', value: '', hint: ''}],
        published: initial?.published ?? false,
    }
}

export default function CaseStudyForm({mode, initial}: {mode: Mode; initial?: CaseStudyRecord}) {
    const router = useRouter()
    const [form, setForm] = useState<FormState>(() => initialState(initial))
    const [errors, setErrors] = useState<FieldErrors>({})
    const [tab, setTab] = useState<'write' | 'preview'>('write')
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [topError, setTopError] = useState('')

    const setField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm(prev => {
            const next = {...prev, [key]: value}
            if (key === 'title' && !prev.slugTouched) next.slug = slugify(value as string)
            return next
        })
        setErrors(prev => {
            if (!prev[key as keyof FieldErrors]) return prev
            const next = {...prev}
            delete next[key as keyof FieldErrors]
            return next
        })
    }, [])

    const setMetric = (i: number, patch: Partial<CaseStudyMetric>) => {
        setForm(prev => {
            const next = [...prev.metrics]
            next[i] = {...next[i], ...patch}
            return {...prev, metrics: next}
        })
    }
    const addMetric = () => {
        setForm(prev => prev.metrics.length >= 6 ? prev : ({...prev, metrics: [...prev.metrics, {label: '', value: '', hint: ''}]}))
    }
    const removeMetric = (i: number) => {
        setForm(prev => ({...prev, metrics: prev.metrics.filter((_, idx) => idx !== i)}))
    }

    const submit = async (publishOverride?: boolean) => {
        const cleanedMetrics = form.metrics
            .filter(m => m.label.trim() && m.value.trim())
            .map(m => ({label: m.label.trim(), value: m.value.trim(), hint: (m.hint || '').trim()}))

        const payload = {
            slug: form.slug.trim(),
            title: form.title.trim(),
            client: form.client.trim(),
            industry: form.industry.trim(),
            excerpt: form.excerpt.trim(),
            body: form.body.trim(),
            category: form.category,
            coverImage: form.coverImage.trim(),
            clientLogo: form.clientLogo.trim(),
            metrics: cleanedMetrics,
            published: publishOverride !== undefined ? publishOverride : form.published,
        }

        setSaving(true)
        setTopError('')
        setErrors({})

        try {
            const url = mode === 'new' ? '/api/admin/case-studies' : `/api/admin/case-studies/${initial!.id}`
            const method = mode === 'new' ? 'POST' : 'PATCH'
            const res = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                if (data.fieldErrors) setErrors(data.fieldErrors)
                setTopError(data.error || 'Salvataggio fallito')
                setSaving(false)
                return
            }
            router.replace('/admin/case-studies')
            router.refresh()
        } catch {
            setTopError('Errore di rete')
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (mode !== 'edit' || !initial) return
        setDeleting(true)
        setTopError('')
        try {
            const res = await fetch(`/api/admin/case-studies/${initial.id}`, {method: 'DELETE'})
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                setTopError(data.error || 'Eliminazione fallita')
                setDeleting(false)
                return
            }
            router.replace('/admin/case-studies')
            router.refresh()
        } catch {
            setTopError('Errore di rete')
            setDeleting(false)
        }
    }

    const inputBase = 'w-full bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none font-mono transition-colors disabled:opacity-50'
    const validMetricCount = useMemo(() => form.metrics.filter(m => m.label.trim() && m.value.trim()).length, [form.metrics])

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">
                        <Link href="/admin/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/60">{mode === 'new' ? 'Nuovo' : 'Modifica'}</span>
                    </p>
                    <h1 className="text-3xl md:text-5xl font-vcr leading-tight" style={{fontWeight: 900}}>
                        {mode === 'new' ? 'Nuovo case study' : form.title || 'Modifica case study'}
                    </h1>
                </div>
            </div>

            {topError && (
                <div className="mb-6 border border-red-500/40 bg-red-500/5 p-4 text-[11px] font-mono text-red-300 uppercase tracking-wider">
                    {topError}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main */}
                <div className="lg:col-span-8 space-y-6">
                    <Field label="Titolo" error={errors.title}>
                        <input type="text" value={form.title} onChange={e => setField('title', e.target.value)}
                               disabled={saving || deleting}
                               className={`${inputBase} ${errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                               placeholder="Es. Chatbot AI per PMI italiana: -68% ticket"/>
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Cliente" error={errors.client}>
                            <input type="text" value={form.client} onChange={e => setField('client', e.target.value)}
                                   disabled={saving || deleting}
                                   className={`${inputBase} ${errors.client ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                   placeholder="Es. Acme PMI Srl"/>
                        </Field>
                        <Field label="Settore" error={errors.industry}>
                            <input type="text" value={form.industry} onChange={e => setField('industry', e.target.value)}
                                   disabled={saving || deleting}
                                   className={`${inputBase} ${errors.industry ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                   placeholder="Es. B2B SaaS"/>
                        </Field>
                    </div>

                    <Field label="Slug" error={errors.slug} hint={`URL: /case-studies/${form.slug || '<slug>'}`}>
                        <input type="text" value={form.slug}
                               onChange={e => {
                                   setForm(prev => ({...prev, slug: e.target.value, slugTouched: true}))
                                   setErrors(prev => ({...prev, slug: undefined}))
                               }}
                               disabled={saving || deleting}
                               className={`${inputBase} ${errors.slug ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                               placeholder="il-mio-case-study"/>
                    </Field>

                    <Field label="Estratto" error={errors.excerpt} hint="Riassunto mostrato sull’indice e nei meta SEO.">
                        <textarea value={form.excerpt} onChange={e => setField('excerpt', e.target.value)}
                                  disabled={saving || deleting} rows={3} maxLength={400}
                                  className={`${inputBase} resize-none ${errors.excerpt ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                  placeholder="Cosa avete fatto e quale risultato concreto?"/>
                    </Field>

                    {/* Metrics editor */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">
                                Metriche ({validMetricCount}/{form.metrics.length} compilate · max 6)
                            </label>
                            <button type="button" onClick={addMetric}
                                    disabled={form.metrics.length >= 6 || saving || deleting}
                                    className="text-[10px] font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors disabled:opacity-30">
                                + Aggiungi
                            </button>
                        </div>
                        <div className="space-y-3">
                            {form.metrics.map((m, i) => (
                                <div key={i} className="grid grid-cols-12 gap-3 items-start">
                                    <input type="text" value={m.label} onChange={e => setMetric(i, {label: e.target.value})}
                                           disabled={saving || deleting} placeholder="Etichetta (es. Ticket -68%)"
                                           className={`${inputBase} col-span-4 border-white/10 focus:border-white/30`}/>
                                    <input type="text" value={m.value} onChange={e => setMetric(i, {value: e.target.value})}
                                           disabled={saving || deleting} placeholder="Valore (es. -68%)"
                                           className={`${inputBase} col-span-3 border-white/10 focus:border-white/30`}/>
                                    <input type="text" value={m.hint || ''} onChange={e => setMetric(i, {hint: e.target.value})}
                                           disabled={saving || deleting} placeholder="Hint (es. in 90 giorni)"
                                           className={`${inputBase} col-span-4 border-white/10 focus:border-white/30`}/>
                                    <button type="button" onClick={() => removeMetric(i)}
                                            disabled={saving || deleting || form.metrics.length === 1}
                                            aria-label="Rimuovi metrica"
                                            className="col-span-1 px-2 py-3 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/40 transition-colors disabled:opacity-30 text-xs">
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Body */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">
                                Corpo (Markdown)
                            </label>
                            <div className="flex gap-1 border border-white/10 p-1">
                                <button type="button" onClick={() => setTab('write')}
                                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${tab === 'write' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>
                                    Scrivi
                                </button>
                                <button type="button" onClick={() => setTab('preview')}
                                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${tab === 'preview' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>
                                    Anteprima
                                </button>
                            </div>
                        </div>
                        {tab === 'write' ? (
                            <textarea value={form.body} onChange={e => setField('body', e.target.value)}
                                      disabled={saving || deleting} rows={22}
                                      className={`${inputBase} resize-y leading-relaxed ${errors.body ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                      placeholder={'## Il contesto\n\nQual era la situazione del cliente?\n\n## La sfida\n\nQuale problema specifico abbiamo risolto?\n\n## La soluzione\n\nCosa abbiamo costruito.\n\n## I risultati\n\nNumeri concreti.'}/>
                        ) : (
                            <div className="bg-white text-black p-6 md:p-8 border border-white/10 min-h-[400px] max-h-[700px] overflow-y-auto">
                                {form.body.trim() ? (
                                    <MarkdownContent source={form.body}/>
                                ) : (
                                    <p className="text-sm text-black/40 font-mono">Inizia a scrivere per vedere l’anteprima…</p>
                                )}
                            </div>
                        )}
                        {errors.body && <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-400">{errors.body}</p>}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-6">
                    <div className="relative border border-white/10 bg-[#0a0a0a] p-5">
                        <span className="absolute top-0 left-0 w-3 h-px bg-white/30"/>
                        <span className="absolute top-0 left-0 w-px h-3 bg-white/30"/>
                        <span className="absolute top-0 right-0 w-3 h-px bg-white/30"/>
                        <span className="absolute top-0 right-0 w-px h-3 bg-white/30"/>
                        <span className="absolute bottom-0 left-0 w-3 h-px bg-white/30"/>
                        <span className="absolute bottom-0 left-0 w-px h-3 bg-white/30"/>
                        <span className="absolute bottom-0 right-0 w-3 h-px bg-white/30"/>
                        <span className="absolute bottom-0 right-0 w-px h-3 bg-white/30"/>

                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">Pubblicazione</p>

                        <label className="flex items-center justify-between gap-3 mb-5 cursor-pointer">
                            <span className="font-vcr text-sm">Stato</span>
                            <button type="button"
                                    onClick={() => setField('published', !form.published)}
                                    disabled={saving || deleting}
                                    aria-pressed={form.published}
                                    className={`relative inline-flex h-5 w-10 items-center transition-colors ${form.published ? 'bg-green-500/30 border border-green-500/60' : 'bg-white/5 border border-white/15'}`}>
                                <span className={`inline-block h-3 w-3 transform transition-transform ${form.published ? 'translate-x-6 bg-green-400' : 'translate-x-1 bg-white/60'}`}/>
                            </button>
                        </label>
                        <p className={`text-[10px] font-mono uppercase tracking-wider mb-6 ${form.published ? 'text-green-400/80' : 'text-white/40'}`}>
                            {form.published ? '● Verrà pubblicato' : '○ Salvato come bozza'}
                        </p>

                        <div className="space-y-3">
                            <button type="button" onClick={() => submit()} disabled={saving || deleting}
                                    className="w-full px-4 py-3 bg-white text-black text-xs font-vcr uppercase tracking-[0.2em] hover:bg-white/90 transition-colors disabled:opacity-50">
                                {saving ? 'Salvataggio…' : (form.published ? 'Salva' : 'Salva bozza')}
                            </button>
                            {!form.published && (
                                <button type="button" onClick={() => submit(true)} disabled={saving || deleting}
                                        className="w-full px-4 py-3 border border-white/15 hover:border-white/40 text-xs font-vcr uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors disabled:opacity-50">
                                    Salva e pubblica →
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="border border-white/10 bg-[#0a0a0a] p-5 space-y-5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Metadati</p>

                        <Field label="Categoria" error={errors.category}>
                            <select value={form.category} onChange={e => setField('category', e.target.value as PostCategory)}
                                    disabled={saving || deleting}
                                    className={`${inputBase} ${errors.category ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}>
                                {POST_CATEGORIES.map(c => <option key={c} value={c}>{POST_CATEGORY_LABEL[c]}</option>)}
                            </select>
                        </Field>

                        <Field label="Cover image (URL)" error={errors.coverImage} hint="Opzionale, 1200x630.">
                            <input type="url" value={form.coverImage} onChange={e => setField('coverImage', e.target.value)}
                                   disabled={saving || deleting}
                                   className={`${inputBase} ${errors.coverImage ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                   placeholder="https://…"/>
                        </Field>

                        <Field label="Logo cliente (URL)" error={errors.clientLogo} hint="PNG/SVG con sfondo trasparente.">
                            <input type="url" value={form.clientLogo} onChange={e => setField('clientLogo', e.target.value)}
                                   disabled={saving || deleting}
                                   className={`${inputBase} ${errors.clientLogo ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                   placeholder="https://…"/>
                        </Field>
                    </div>

                    {mode === 'edit' && (
                        <div className="border border-red-500/20 bg-red-500/[0.03] p-5">
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-400/70 mb-3">Zona pericolosa</p>
                            {confirmDelete ? (
                                <div className="space-y-3">
                                    <p className="text-xs font-mono text-red-300/90">Eliminazione definitiva.</p>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={handleDelete} disabled={deleting}
                                                className="flex-1 px-3 py-2 bg-red-500 text-white text-[10px] font-vcr uppercase tracking-[0.2em] hover:bg-red-600 transition-colors disabled:opacity-50">
                                            {deleting ? 'Eliminazione…' : 'Conferma'}
                                        </button>
                                        <button type="button" onClick={() => setConfirmDelete(false)} disabled={deleting}
                                                className="flex-1 px-3 py-2 border border-white/15 text-[10px] font-vcr uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                                            Annulla
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setConfirmDelete(true)} disabled={saving || deleting}
                                        className="w-full px-3 py-2 border border-red-500/30 text-[10px] font-vcr uppercase tracking-[0.2em] text-red-400/80 hover:text-red-300 hover:border-red-500/60 transition-colors disabled:opacity-50">
                                    Elimina case study
                                </button>
                            )}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

function Field({label, error, hint, children}: {label: string; error?: string; hint?: string; children: React.ReactNode}) {
    return (
        <div>
            <label className="block text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-2">{label}</label>
            {children}
            {error && <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-400">{error}</p>}
            {!error && hint && <p className="mt-2 text-[10px] font-mono text-white/30">{hint}</p>}
        </div>
    )
}
