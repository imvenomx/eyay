'use client'
import React, {useState, useCallback, useMemo} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import MarkdownContent from '@/components/markdown-content'
import SeoPanel from '../seo-panel'
import {slugify} from '@/lib/slugify'
import {POST_CATEGORIES, POST_CATEGORY_LABEL, type PostCategory, type PostRecord} from '@/lib/store/types'
import {formatReadingTime} from '@/lib/reading-time'

type FieldErrors = Partial<Record<'slug' | 'title' | 'excerpt' | 'body' | 'category' | 'author' | 'coverImage', string>>
type Mode = 'new' | 'edit'

export interface PostFormProps {
    mode: Mode
    initial?: PostRecord
}

interface FormState {
    title: string
    slug: string
    slugTouched: boolean
    excerpt: string
    body: string
    category: PostCategory
    author: string
    coverImage: string
    published: boolean
}

function initialState(initial?: PostRecord): FormState {
    return {
        title: initial?.title ?? '',
        slug: initial?.slug ?? '',
        slugTouched: !!initial,
        excerpt: initial?.excerpt ?? '',
        body: initial?.body ?? '',
        category: initial?.category ?? 'ai',
        author: initial?.author ?? 'Eey Aay',
        coverImage: initial?.coverImage ?? '',
        published: initial?.published ?? false,
    }
}

export default function PostForm({mode, initial}: PostFormProps) {
    const router = useRouter()
    const [form, setForm] = useState<FormState>(() => initialState(initial))
    const [errors, setErrors] = useState<FieldErrors>({})
    const [tab, setTab] = useState<'write' | 'preview' | 'seo'>('write')
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

    const submit = async (publishOverride?: boolean) => {
        const payload = {
            slug: form.slug.trim(),
            title: form.title.trim(),
            excerpt: form.excerpt.trim(),
            body: form.body.trim(),
            category: form.category,
            author: form.author.trim() || 'Eey Aay',
            coverImage: form.coverImage.trim(),
            published: publishOverride !== undefined ? publishOverride : form.published,
        }

        setSaving(true)
        setTopError('')
        setErrors({})

        try {
            const url = mode === 'new' ? '/api/admin/posts' : `/api/admin/posts/${initial!.id}`
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
            if (publishOverride !== undefined) {
                setForm(prev => ({...prev, published: publishOverride}))
            }
            router.replace('/admin/blogs')
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
            const res = await fetch(`/api/admin/posts/${initial.id}`, {method: 'DELETE'})
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                setTopError(data.error || 'Eliminazione fallita')
                setDeleting(false)
                return
            }
            router.replace('/admin/blogs')
            router.refresh()
        } catch {
            setTopError('Errore di rete')
            setDeleting(false)
        }
    }

    const readingHint = useMemo(() => (form.body.trim() ? formatReadingTime(form.body) : '—'), [form.body])

    const inputBase = 'w-full bg-white/5 border px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none font-mono transition-colors disabled:opacity-50'

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">
                        <Link href="/admin/blogs" className="hover:text-white transition-colors">Blog</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white/60">{mode === 'new' ? 'Nuovo articolo' : 'Modifica'}</span>
                    </p>
                    <h1 className="text-3xl md:text-5xl font-vcr leading-tight" style={{fontWeight: 900}}>
                        {mode === 'new' ? 'Nuovo articolo' : form.title || 'Modifica articolo'}
                    </h1>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                    <span>{readingHint}</span>
                </div>
            </div>

            {topError && (
                <div className="mb-6 border border-red-500/40 bg-red-500/5 p-4 text-[11px] font-mono text-red-300 uppercase tracking-wider">
                    {topError}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main column */}
                <div className="lg:col-span-8 space-y-6">
                    <Field label="Titolo" error={errors.title}>
                        <input
                            type="text" value={form.title}
                            onChange={e => setField('title', e.target.value)}
                            disabled={saving || deleting}
                            className={`${inputBase} ${errors.title ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'}`}
                            placeholder="Es. Come integrare un chatbot AI in 7 giorni"
                        />
                    </Field>

                    <Field label="Slug" error={errors.slug} hint={`URL: /blog/${form.slug || '<slug>'}`}>
                        <input
                            type="text" value={form.slug}
                            onChange={e => {
                                setForm(prev => ({...prev, slug: e.target.value, slugTouched: true}))
                                setErrors(prev => ({...prev, slug: undefined}))
                            }}
                            disabled={saving || deleting}
                            className={`${inputBase} ${errors.slug ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'}`}
                            placeholder="il-mio-articolo"
                        />
                    </Field>

                    <Field label="Estratto" error={errors.excerpt} hint="Mostrato nelle card del blog e nei meta SEO.">
                        <textarea
                            value={form.excerpt}
                            onChange={e => setField('excerpt', e.target.value)}
                            disabled={saving || deleting}
                            rows={3}
                            maxLength={400}
                            className={`${inputBase} resize-none ${errors.excerpt ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'}`}
                            placeholder="Una frase o due che spiegano di cosa parla l'articolo."
                        />
                    </Field>

                    {/* Body with tabs */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">
                                Corpo articolo (Markdown)
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
                                <button type="button" onClick={() => setTab('seo')}
                                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${tab === 'seo' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>
                                    SEO
                                </button>
                            </div>
                        </div>
                        {tab === 'write' && (
                            <textarea
                                value={form.body}
                                onChange={e => setField('body', e.target.value)}
                                disabled={saving || deleting}
                                rows={22}
                                className={`${inputBase} resize-y leading-relaxed ${errors.body ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'}`}
                                placeholder={'## Titolo sezione\n\nScrivi qui in **markdown**.\n\n- Punto uno\n- Punto due\n\n> Una citazione importante.'}
                            />
                        )}
                        {tab === 'preview' && (
                            <div className="bg-white text-black p-6 md:p-8 border border-white/10 min-h-[400px] max-h-[700px] overflow-y-auto">
                                {form.body.trim() ? (
                                    <MarkdownContent source={form.body}/>
                                ) : (
                                    <p className="text-sm text-black/40 font-mono">Inizia a scrivere per vedere l’anteprima…</p>
                                )}
                            </div>
                        )}
                        {tab === 'seo' && (
                            <SeoPanel
                                title={form.title}
                                slug={form.slug}
                                excerpt={form.excerpt}
                                body={form.body}
                                coverImage={form.coverImage}
                                basePath="/blog"
                                kind="post"
                                onApplyFix={(field, value) => {
                                    if (field === 'slug') {
                                        setForm(prev => ({...prev, slug: value, slugTouched: true}))
                                    } else {
                                        setField(field as 'title' | 'excerpt' | 'body', value)
                                    }
                                }}
                            />
                        )}
                        {errors.body && (
                            <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-400">{errors.body}</p>
                        )}
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
                            <span className="font-vcr text-sm">Stato bozza</span>
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
                            <button type="button" onClick={() => submit()}
                                    disabled={saving || deleting}
                                    className="w-full px-4 py-3 bg-white text-black text-xs font-vcr uppercase tracking-[0.2em] hover:bg-white/90 transition-colors disabled:opacity-50">
                                {saving ? 'Salvataggio…' : (form.published ? 'Salva' : 'Salva bozza')}
                            </button>
                            {!form.published && (
                                <button type="button" onClick={() => submit(true)}
                                        disabled={saving || deleting}
                                        className="w-full px-4 py-3 border border-white/15 hover:border-white/40 text-xs font-vcr uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors disabled:opacity-50">
                                    Salva e pubblica →
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="border border-white/10 bg-[#0a0a0a] p-5 space-y-5">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Metadati</p>

                        <Field label="Categoria" error={errors.category}>
                            <select
                                value={form.category}
                                onChange={e => setField('category', e.target.value as PostCategory)}
                                disabled={saving || deleting}
                                className={`${inputBase} ${errors.category ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}>
                                {POST_CATEGORIES.map(c => (
                                    <option key={c} value={c}>{POST_CATEGORY_LABEL[c]}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Autore" error={errors.author}>
                            <input
                                type="text" value={form.author}
                                onChange={e => setField('author', e.target.value)}
                                disabled={saving || deleting}
                                className={`${inputBase} ${errors.author ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                placeholder="Eey Aay"
                            />
                        </Field>

                        <Field label="Cover image (URL)" error={errors.coverImage} hint="Opzionale. Incolla l’URL di un’immagine 1200x630.">
                            <input
                                type="url" value={form.coverImage}
                                onChange={e => setField('coverImage', e.target.value)}
                                disabled={saving || deleting}
                                className={`${inputBase} ${errors.coverImage ? 'border-red-500/50' : 'border-white/10 focus:border-white/30'}`}
                                placeholder="https://…"
                            />
                        </Field>
                    </div>

                    {mode === 'edit' && (
                        <div className="border border-red-500/20 bg-red-500/[0.03] p-5">
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-400/70 mb-3">Zona pericolosa</p>
                            {confirmDelete ? (
                                <div className="space-y-3">
                                    <p className="text-xs font-mono text-red-300/90 leading-relaxed">
                                        Eliminazione definitiva. Non recuperabile.
                                    </p>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={handleDelete} disabled={deleting}
                                                className="flex-1 px-3 py-2 bg-red-500 text-white text-[10px] font-vcr uppercase tracking-[0.2em] hover:bg-red-600 transition-colors disabled:opacity-50">
                                            {deleting ? 'Eliminazione…' : 'Conferma'}
                                        </button>
                                        <button type="button" onClick={() => setConfirmDelete(false)} disabled={deleting}
                                                className="flex-1 px-3 py-2 border border-white/15 text-[10px] font-vcr uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/40 transition-colors">
                                            Annulla
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setConfirmDelete(true)} disabled={saving || deleting}
                                        className="w-full px-3 py-2 border border-red-500/30 text-[10px] font-vcr uppercase tracking-[0.2em] text-red-400/80 hover:text-red-300 hover:border-red-500/60 transition-colors disabled:opacity-50">
                                    Elimina articolo
                                </button>
                            )}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

function Field({label, error, hint, children}: {
    label: string
    error?: string
    hint?: string
    children: React.ReactNode
}) {
    return (
        <div>
            <label className="block text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-2">{label}</label>
            {children}
            {error && <p className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-400">{error}</p>}
            {!error && hint && <p className="mt-2 text-[10px] font-mono text-white/30">{hint}</p>}
        </div>
    )
}
