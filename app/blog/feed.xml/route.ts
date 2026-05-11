import {NextResponse} from 'next/server'
import {listPublishedPosts, type PostRecord} from '@/lib/store'
import {SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl} from '@/lib/site'

export const dynamic = 'force-dynamic'

function escapeXml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function rfc822(iso: string | null): string {
    return new Date(iso || Date.now()).toUTCString()
}

function postToItem(post: PostRecord): string {
    const url = absoluteUrl(`/blog/${post.slug}`)
    return `        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <pubDate>${rfc822(post.publishedAt)}</pubDate>
            <description>${escapeXml(post.excerpt)}</description>
            <category>${escapeXml(post.category)}</category>
            <author>support@eeyaay.it (${escapeXml(post.author)})</author>
        </item>`
}

export async function GET() {
    let posts: PostRecord[] = []
    try {
        posts = (await listPublishedPosts()).slice(0, 30)
    } catch {
        posts = []
    }

    const latest = posts[0]?.publishedAt || posts[0]?.updatedAt || new Date().toISOString()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(SITE_NAME)} — Blog</title>
        <link>${SITE_URL}/blog</link>
        <description>${escapeXml(SITE_DESCRIPTION)}</description>
        <language>it-IT</language>
        <lastBuildDate>${rfc822(latest)}</lastBuildDate>
        <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(postToItem).join('\n')}
    </channel>
</rss>`

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=600, s-maxage=600',
        },
    })
}
