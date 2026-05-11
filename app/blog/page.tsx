import type {Metadata} from 'next'
import Link from 'next/link'
import BinaryHover from '@/components/binary-hover'
import {
    listPublishedPosts,
    POST_CATEGORIES,
    POST_CATEGORY_LABEL,
    type PostCategory,
    type PostRecord,
} from '@/lib/store'
import {formatReadingTime} from '@/lib/reading-time'
import {siteOgImage} from '@/lib/site'

export const dynamic = 'force-dynamic'

const BLOG_OG = siteOgImage({title: 'Blog', subtitle: 'Note, casi studio e guide pratiche su AI e automazione', eyebrow: 'Blog // Eey Aay'})

export const metadata: Metadata = {
    title: 'Blog — Eey Aay',
    description: 'Note, casi studio e guide pratiche su AI, automazione, crescita e dati dal team Eey Aay.',
    openGraph: {
        title: 'Blog — Eey Aay',
        description: 'Note, casi studio e guide pratiche su AI, automazione, crescita e dati.',
        images: [{url: BLOG_OG, width: 1200, height: 630}],
        locale: 'it_IT',
    },
    alternates: {
        canonical: '/blog',
        types: {
            'application/rss+xml': '/blog/feed.xml',
        },
    },
}

function isCategory(v: string | string[] | undefined): v is PostCategory {
    if (typeof v !== 'string') return false
    return (POST_CATEGORIES as readonly string[]).includes(v)
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('it-IT', {day: '2-digit', month: 'short', year: 'numeric'})
}

export default async function BlogIndexPage({searchParams}: {searchParams: Promise<{cat?: string}>}) {
    const params = await searchParams
    const activeCat: PostCategory | null = isCategory(params.cat) ? params.cat : null
    const posts = await listPublishedPosts(activeCat ? {category: activeCat} : undefined)

    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-20 md:pt-36 md:pb-28">
                {/* Heading */}
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">Blog // Note dal lab</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
                    <div className="md:col-span-7">
                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-1.5"/>
                        <h1 className="text-4xl md:text-6xl leading-[1.05] inline font-vcr" style={{fontWeight: 900}}>
                            Idee, casi reali e<br/>guide su AI e automazione.
                        </h1>
                    </div>
                    <div className="md:col-span-5 md:pt-3">
                        <p className="text-sm text-black/55 leading-relaxed">
                            Cosa stiamo costruendo, cosa abbiamo imparato e cosa puoi applicare oggi nella tua azienda.
                            Pubblichiamo a ritmo lento, senza fuffa.
                        </p>
                    </div>
                </div>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mb-12 border-t border-black/10 pt-8">
                    <FilterChip href="/blog" active={!activeCat} label="Tutti"/>
                    {POST_CATEGORIES.map(cat => (
                        <FilterChip
                            key={cat}
                            href={`/blog?cat=${cat}`}
                            active={activeCat === cat}
                            label={POST_CATEGORY_LABEL[cat]}
                        />
                    ))}
                </div>

                {/* Grid */}
                {posts.length === 0 ? (
                    <EmptyState category={activeCat}/>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
                        {posts.map(p => (
                            <PostCard key={p.id} post={p}/>
                        ))}
                    </div>
                )}

                <div className="mt-16 pt-8 border-t border-black/10 flex flex-wrap items-center gap-6">
                    <a href="/blog/feed.xml"
                       className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 hover:text-black transition-colors">
                        <span className="w-1 h-1 rounded-full bg-black/40"/>
                        Sottoscrivi RSS
                    </a>
                    <a href="/sitemap.xml"
                       className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 hover:text-black transition-colors">
                        Sitemap
                    </a>
                </div>
            </div>
        </main>
    )
}

function FilterChip({href, active, label}: {href: string; active: boolean; label: string}) {
    return (
        <Link
            href={href}
            scroll={false}
            className={`px-4 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-wider transition-colors ${
                active
                    ? 'bg-black text-white border-black'
                    : 'border-black/15 text-black/60 hover:text-black hover:border-black/40'
            }`}>
            <BinaryHover>{label}</BinaryHover>
        </Link>
    )
}

function PostCard({post}: {post: PostRecord}) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group relative bg-white p-7 md:p-8 flex flex-col hover:bg-black/[0.02] transition-colors">
            {/* Crosshair corners */}
            <span className="absolute top-0 left-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute top-0 left-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute top-0 right-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute top-0 right-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute bottom-0 left-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute bottom-0 left-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute bottom-0 right-0 w-3 h-px bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <span className="absolute bottom-0 right-0 w-px h-3 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"/>

            <div className="flex items-center gap-3 mb-5 text-[10px] font-mono uppercase tracking-[0.2em] text-black/40">
                <span className="text-black/70">{POST_CATEGORY_LABEL[post.category]}</span>
                <span className="w-1 h-1 rounded-full bg-black/20"/>
                <span>{post.publishedAt ? formatDate(post.publishedAt) : ''}</span>
            </div>

            <h2 className="font-vcr text-xl md:text-2xl leading-tight mb-3 flex-1">
                <BinaryHover>{post.title}</BinaryHover>
            </h2>

            <p className="text-sm text-black/55 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>

            <div className="flex items-baseline justify-between mt-auto pt-5 border-t border-black/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-black/40">
                    {formatReadingTime(post.body)}
                </span>
                <span className="font-vcr text-[10px] uppercase tracking-[0.2em] text-black/60 group-hover:text-black transition-colors">
                    Leggi →
                </span>
            </div>
        </Link>
    )
}

function EmptyState({category}: {category: PostCategory | null}) {
    return (
        <div className="relative border border-dashed border-black/15 p-12 md:p-16 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-3">
                // {category ? `Categoria: ${POST_CATEGORY_LABEL[category]}` : 'Archivio vuoto'}
            </p>
            <p className="font-vcr text-2xl md:text-3xl mb-3" style={{fontWeight: 900}}>
                Nessun articolo {category ? 'in questa categoria' : 'ancora pubblicato'}
            </p>
            <p className="text-sm font-mono text-black/40 max-w-md mx-auto">
                {category
                    ? 'Prova a guardare tra le altre categorie o torna più tardi.'
                    : 'Stiamo scaldando i motori. Iscriviti alla newsletter per essere il primo a saperlo.'}
            </p>
            {category && (
                <Link href="/blog" className="inline-block mt-6 px-5 py-2 rounded-full border border-black/20 text-xs font-vcr uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                    Vedi tutti
                </Link>
            )}
        </div>
    )
}
