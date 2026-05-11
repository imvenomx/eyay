import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import BinaryHover from '@/components/binary-hover'
import MarkdownContent from '@/components/markdown-content'
import {
    getPublishedPostBySlug,
    listPublishedPosts,
    POST_CATEGORY_LABEL,
    type PostRecord,
} from '@/lib/store'
import {formatReadingTime} from '@/lib/reading-time'
import {ctaForCategory} from '@/lib/category-cta'
import JsonLd from '@/components/json-ld'
import {articleSchema, breadcrumbSchema} from '@/lib/schemas'
import {absoluteUrl} from '@/lib/site'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{slug: string}>
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('it-IT', {day: 'numeric', month: 'long', year: 'numeric'})
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {slug} = await params
    const post = await getPublishedPostBySlug(slug)
    if (!post) return {title: 'Articolo non trovato'}
    const dynamicOg = `/api/og/post?title=${encodeURIComponent(post.title)}&cat=${encodeURIComponent(post.category)}&date=${encodeURIComponent(post.publishedAt?.slice(0, 10) || '')}`
    const ogImage = post.coverImage || dynamicOg
    return {
        title: `${post.title} — Eey Aay`,
        description: post.excerpt,
        alternates: {canonical: `/blog/${post.slug}`},
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            locale: 'it_IT',
            publishedTime: post.publishedAt || undefined,
            authors: [post.author],
            images: [{url: ogImage, width: 1200, height: 630, alt: post.title}],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
    }
}

async function getRelated(post: PostRecord): Promise<PostRecord[]> {
    const sameCat = await listPublishedPosts({category: post.category})
    const filtered = sameCat.filter(p => p.id !== post.id).slice(0, 3)
    if (filtered.length >= 2) return filtered
    const all = await listPublishedPosts()
    const seen = new Set(filtered.map(p => p.id).concat(post.id))
    for (const p of all) {
        if (!seen.has(p.id)) {
            filtered.push(p)
            seen.add(p.id)
            if (filtered.length === 3) break
        }
    }
    return filtered
}

export default async function BlogPostPage({params}: PageProps) {
    const {slug} = await params
    const post = await getPublishedPostBySlug(slug)
    if (!post) notFound()

    const related = await getRelated(post)
    const cta = ctaForCategory(post.category)

    const breadcrumbs = breadcrumbSchema([
        {name: 'Home', url: absoluteUrl('/')},
        {name: 'Blog', url: absoluteUrl('/blog')},
        {name: POST_CATEGORY_LABEL[post.category], url: absoluteUrl(`/blog?cat=${post.category}`)},
        {name: post.title, url: absoluteUrl(`/blog/${post.slug}`)},
    ])

    return (
        <main className="bg-white text-black" data-nav-theme="light">
            <JsonLd data={articleSchema(post)}/>
            <JsonLd data={breadcrumbs}/>
            {/* Header */}
            <article className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-16 md:pt-36 md:pb-20">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-10">
                    <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black/60">{POST_CATEGORY_LABEL[post.category]}</span>
                </nav>

                {/* Title block */}
                <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12">
                    <div className="md:col-span-8">
                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-1.5"/>
                        <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr" style={{fontWeight: 900}}>
                            {post.title}
                        </h1>
                        <p className="text-base md:text-lg text-black/65 leading-relaxed mt-8">
                            {post.excerpt}
                        </p>
                    </div>
                    <aside className="md:col-span-4 md:border-l border-black/10 md:pl-8">
                        <dl className="space-y-5 text-xs">
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Autore</dt>
                                <dd className="font-vcr text-sm">{post.author}</dd>
                            </div>
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Pubblicato</dt>
                                <dd className="font-mono text-sm text-black/70">
                                    {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Lettura</dt>
                                <dd className="font-mono text-sm text-black/70">{formatReadingTime(post.body)}</dd>
                            </div>
                            <div>
                                <dt className="font-mono uppercase tracking-[0.2em] text-black/40 mb-1">Categoria</dt>
                                <dd>
                                    <Link
                                        href={`/blog?cat=${post.category}`}
                                        className="inline-block px-3 py-1 rounded-full border border-black/15 text-[10px] font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                                        {POST_CATEGORY_LABEL[post.category]}
                                    </Link>
                                </dd>
                            </div>
                        </dl>
                    </aside>
                </header>

                {/* Cover image */}
                {post.coverImage && (
                    <div className="mb-12 border border-black/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage} alt={post.title} className="w-full h-auto"/>
                    </div>
                )}

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-8 md:col-start-3">
                        <MarkdownContent source={post.body}/>
                    </div>
                </div>
            </article>

            {/* Contextual CTA */}
            <section className="bg-black text-white">
                <div className="w-full border-l border-r border-white/10 px-8 md:px-16 lg:px-20 py-20 md:py-28">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-7">
                            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-6">
                                {cta.eyebrow}
                            </p>
                            <h2 className="text-3xl md:text-5xl font-vcr leading-[1.1] mb-6" style={{fontWeight: 900}}>
                                {cta.title}
                            </h2>
                            <p className="text-base text-white/60 leading-relaxed max-w-xl">{cta.desc}</p>
                        </div>
                        <div className="md:col-span-5 flex md:items-end md:justify-end">
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={cta.href}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-vcr uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
                                    <BinaryHover>{cta.button}</BinaryHover>
                                    <span>→</span>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-xs font-vcr uppercase tracking-[0.2em] text-white/80 hover:text-white hover:border-white/50 transition-colors">
                                    Parliamone
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related posts */}
            {related.length > 0 && (
                <section className="bg-white text-black">
                    <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 py-16 md:py-24">
                        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">Continua a leggere</p>
                        <h2 className="text-2xl md:text-4xl font-vcr leading-tight mb-10" style={{fontWeight: 900}}>
                            Articoli correlati
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
                            {related.map(p => (
                                <Link key={p.id} href={`/blog/${p.slug}`}
                                      className="group bg-white p-6 hover:bg-black/[0.02] transition-colors flex flex-col">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/40 mb-3">
                                        {POST_CATEGORY_LABEL[p.category]}
                                    </p>
                                    <h3 className="font-vcr text-lg leading-tight mb-2 flex-1">
                                        <BinaryHover>{p.title}</BinaryHover>
                                    </h3>
                                    <p className="text-xs text-black/50 leading-relaxed line-clamp-2 mb-4">{p.excerpt}</p>
                                    <span className="font-vcr text-[10px] uppercase tracking-[0.2em] text-black/60 group-hover:text-black transition-colors">
                                        Leggi →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}
