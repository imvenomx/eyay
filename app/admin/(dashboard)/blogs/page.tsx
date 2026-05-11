import React from 'react'
import Link from 'next/link'
import {listAdminPosts, POST_CATEGORY_LABEL} from '@/lib/store'

export const dynamic = 'force-dynamic'

function formatDate(iso: string): string {
    return new Date(iso).toLocaleString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    })
}

export default async function BlogsPage() {
    const posts = await listAdminPosts()
    const publishedCount = posts.filter(p => p.published).length
    const draftCount = posts.length - publishedCount

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">Content</p>
                    <h1 className="text-3xl md:text-5xl font-vcr leading-tight mb-2" style={{fontWeight: 900}}>
                        Blog
                    </h1>
                    <p className="text-sm text-white/50">
                        {posts.length} articoli — {publishedCount} pubblicati, {draftCount} bozze
                    </p>
                </div>
                <Link
                    href="/admin/blogs/new"
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
                        + Nuovo articolo
                    </span>
                </Link>
            </div>

            {posts.length === 0 ? (
                <EmptyState/>
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

                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                        <div className="col-span-5">Titolo</div>
                        <div className="col-span-2">Categoria</div>
                        <div className="col-span-2">Stato</div>
                        <div className="col-span-2 text-right">Aggiornato</div>
                        <div className="col-span-1 text-right">Azioni</div>
                    </div>

                    {posts.map(p => (
                        <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 items-center hover:bg-white/[0.02] transition-colors">
                            <div className="col-span-5">
                                <Link href={`/admin/blogs/${p.id}/edit`} className="block group">
                                    <p className="font-vcr text-sm leading-tight group-hover:text-white text-white/90 transition-colors">{p.title}</p>
                                    <p className="text-[10px] font-mono text-white/30 mt-1">/{p.slug}</p>
                                </Link>
                            </div>
                            <div className="col-span-2 text-xs font-mono uppercase tracking-wider text-white/60">
                                {POST_CATEGORY_LABEL[p.category]}
                            </div>
                            <div className="col-span-2">
                                <StatusBadge published={p.published}/>
                            </div>
                            <div className="col-span-2 text-right text-[10px] font-mono text-white/40 whitespace-nowrap">
                                {formatDate(p.updatedAt)}
                            </div>
                            <div className="col-span-1 text-right flex items-center justify-end gap-3">
                                <Link href={`/admin/blogs/${p.id}/edit`}
                                      className="text-[10px] font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                                    Edit
                                </Link>
                                {p.published && (
                                    <Link href={`/blog/${p.slug}`} target="_blank" rel="noopener"
                                          aria-label="Apri articolo pubblicato"
                                          className="text-[10px] font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                                        ↗
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

function StatusBadge({published}: {published: boolean}) {
    if (published) {
        return (
            <span className="inline-flex items-center gap-2 px-2 py-1 border border-green-500/40 text-[9px] font-mono uppercase tracking-wider text-green-400/90">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"/>
                Pubblicato
            </span>
        )
    }
    return (
        <span className="inline-flex items-center gap-2 px-2 py-1 border border-white/15 text-[9px] font-mono uppercase tracking-wider text-white/50">
            <span className="w-1 h-1 rounded-full bg-white/30"/>
            Bozza
        </span>
    )
}

function EmptyState() {
    return (
        <div className="relative border border-dashed border-white/15 bg-[#0a0a0a]/50 p-12 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">// Archivio vuoto</p>
            <p className="font-vcr text-2xl mb-4">Nessun articolo</p>
            <p className="text-xs font-mono text-white/40 max-w-md mx-auto mb-6">
                Crea il primo articolo per iniziare a popolare il blog.
            </p>
            <Link href="/admin/blogs/new"
                  className="inline-block px-5 py-2.5 border border-white/20 text-[10px] font-vcr uppercase tracking-[0.25em] text-white/80 hover:text-white hover:border-white/50 transition-colors">
                + Nuovo articolo
            </Link>
        </div>
    )
}
