#!/usr/bin/env tsx
/**
 * generate-blog-images.ts
 *
 * Reads published posts from Supabase, generates one cover image per
 * post via OpenRouter, saves to /public/blog/<slug>.webp (as WebP),
 * and updates the post's cover_image column to point at the local file.
 *
 *   npx tsx --env-file=.env.local scripts/generate-blog-images.ts
 *
 * Flags:
 *   --slug=<slug>   only generate this slug
 *   --dry-run       just print prompts
 *   --force         overwrite existing file even if cover_image is set
 *   --model=<id>    override model (default openai/gpt-5.4-image-2)
 *
 * Output is 1200×630 (LinkedIn / Twitter standard OG aspect), encoded
 * as WebP quality 88. Typical size ~30-90 KB per cover.
 */
import {promises as fs} from 'fs'
import path from 'path'
import sharp from 'sharp'
import {createClient} from '@supabase/supabase-js'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface Args {
    slug?: string
    dryRun: boolean
    force: boolean
    model: string
}

function parseArgs(argv: string[]): Args {
    const args: Args = {dryRun: false, force: false, model: 'openai/gpt-5.4-image-2'}
    for (const a of argv) {
        if (a === '--dry-run') args.dryRun = true
        else if (a === '--force') args.force = true
        else if (a.startsWith('--slug=')) args.slug = a.slice('--slug='.length)
        else if (a.startsWith('--model=')) args.model = a.slice('--model='.length)
    }
    return args
}

// Per-slug visual hooks. Maps each known post slug to a "subject" phrase.
// If a slug isn't here we fall back to a generic prompt built from title+excerpt.
const SUBJECT_HINTS: Record<string, string> = {
    'chatbot-ai-pmi-italiana-guida-pratica': 'central isometric chat-bubble interface connected by thin wires to multiple small generic device terminals',
    'rag-vs-fine-tuning-quale-scegliere': 'two parallel data pipelines: one with documents flowing into a neural retrieval layer, the other with a small model getting retrained — clear A/B contrast',
    'voice-ai-vs-call-center-roi-reale': 'minimalist isometric headset hovering over a faint waveform plate, with a tiny cluster of empty desk modules in the background — abstract not literal',
    'automazione-crm-integrazione-prima-settimana': 'data nodes converging into a central CRM hub, several smaller satellite systems connected via thin pipes, light grid floor',
    'rpa-vs-ai-agents-quando-usare-cosa': 'mechanical robotic arm next to a translucent neural agent module on an isometric platform — two distinct silhouettes, comparing forms',
    'email-marketing-automation-2026-cosa-funziona': 'isometric envelope opening into a branching flow of small message panels, light grid lines, no text rendered',
    'seo-italia-2026-come-cambia': 'magnifying glass abstracted into a thin ring hovering over layered floating cards (search results) with a small ascending bar chart',
    'ecommerce-conversion-rate-quattro-cose-davvero-importanti': 'tiny shopping cart silhouette on a pedestal with four small floating metric tiles around it, very sparse',
    'machine-learning-pmi-quando-ha-senso': 'rows of small data cubes feeding through a translucent prism into a clean output column, isometric, blueprint feel',
}

const STYLE_BASE = [
    'abstract dark technical illustration, editorial cover for a B2B AI consultancy blog',
    'monochromatic black and graphite tones with a single subtle green accent',
    'isometric low-poly geometry, sparse composition, generous negative space',
    'precise blueprint feel, thin grid lines, crosshair markers, light noise',
    'studio lighting from upper-left, deep shadows',
    'no human faces, no logos, no readable text',
].join(', ')

function promptFor(post: {slug: string; title: string; excerpt: string}): string {
    const hint = SUBJECT_HINTS[post.slug] || `subject inspired by: ${post.excerpt}`
    return [
        `Cover image for: "${post.title}".`,
        `Subject hint: ${hint}.`,
        `Style: ${STYLE_BASE}.`,
        `Composition: wide 16:9 framing, subject center-left, breathing room to the right for OG meta overlay.`,
        `Mood: precise, clinical, confident. NOT generic AI / glowing dots / brain stock cliché.`,
    ].join('\n')
}

interface ChatResponse {
    choices?: Array<{
        message?: {
            content?: string | Array<{type?: string; image_url?: {url?: string} | string}>
            images?: Array<{type?: string; image_url?: {url?: string} | string}>
        }
    }>
    error?: {message?: string; code?: string}
}

function findImageUrl(data: ChatResponse): string | null {
    const msg = data.choices?.[0]?.message
    if (!msg) return null
    if (Array.isArray(msg.images) && msg.images.length > 0) {
        const first = msg.images[0]
        const u = typeof first.image_url === 'string' ? first.image_url : first.image_url?.url
        if (u) return u
    }
    if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
            if (block.type === 'image_url' || block.type === 'image') {
                const u = typeof block.image_url === 'string' ? block.image_url : block.image_url?.url
                if (u) return u
            }
        }
    }
    return null
}

async function callOpenRouter(apiKey: string, model: string, prompt: string): Promise<Buffer> {
    const res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://www.eeyaay.it',
            'X-Title': 'Eey Aay blog cover generator',
        },
        body: JSON.stringify({
            model,
            messages: [{role: 'user', content: prompt}],
            modalities: ['image', 'text'],
            // Cap explicitly. Without this OpenRouter reserves the model's full
            // context (~65k tokens / ~$0.98 each) per request, which trips the
            // weekly per-key cap quickly even though actual usage is tiny.
            max_tokens: 8192,
        }),
    })
    const text = await res.text()
    let data: ChatResponse = {}
    try { data = JSON.parse(text) } catch { /* keep raw text in error */ }
    if (!res.ok || data.error) {
        const msg = data.error?.message || `HTTP ${res.status}: ${text.slice(0, 300)}`
        throw new Error(`OpenRouter request failed: ${msg}`)
    }
    const url = findImageUrl(data)
    if (!url) throw new Error(`OpenRouter returned no image. Response: ${text.slice(0, 300)}`)
    if (url.startsWith('data:')) {
        const comma = url.indexOf(',')
        if (comma < 0) throw new Error('Malformed data URL')
        return Buffer.from(url.slice(comma + 1), 'base64')
    }
    const imgRes = await fetch(url)
    if (!imgRes.ok) throw new Error(`Could not download image from ${url}`)
    return Buffer.from(await imgRes.arrayBuffer())
}

async function main() {
    const args = parseArgs(process.argv.slice(2))
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey && !args.dryRun) {
        console.error('OPENROUTER_API_KEY is required (or use --dry-run).')
        process.exit(1)
    }

    const supaUrl = process.env.SUPABASE_URL
    const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supaUrl || !supaKey) {
        console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.')
        process.exit(1)
    }
    const client = createClient(supaUrl, supaKey, {auth: {persistSession: false, autoRefreshToken: false}})

    let query = client.from('posts').select('id, slug, title, excerpt, cover_image').eq('published', true)
    if (args.slug) query = query.eq('slug', args.slug)
    const {data: posts, error} = await query
    if (error) {
        console.error(`Could not load posts: ${error.message}`)
        process.exit(1)
    }
    if (!posts || posts.length === 0) {
        console.error('No published posts found.')
        process.exit(1)
    }

    const outDir = path.join(process.cwd(), 'public', 'blog')
    await fs.mkdir(outDir, {recursive: true})

    console.log(`Generating ${posts.length} blog covers${args.dryRun ? ' (DRY RUN)' : ''}\n`)

    let generated = 0
    let skipped = 0
    let failed = 0

    for (const post of posts) {
        const outPath = path.join(outDir, `${post.slug}.webp`)
        const publicPath = `/blog/${post.slug}.webp`

        let exists = false
        try { await fs.access(outPath); exists = true } catch { /* missing */ }

        if (exists && !args.force) {
            // Update DB pointer if it isn't already set
            if (post.cover_image !== publicPath && !args.dryRun) {
                await client.from('posts').update({cover_image: publicPath}).eq('id', post.id)
            }
            console.log(`  skip   ${post.slug} (file exists; --force to overwrite)`)
            skipped++
            continue
        }

        const prompt = promptFor(post)
        console.log(`\n[${post.slug}] ${post.title}`)
        console.log(prompt.split('\n').map(l => '    ' + l).join('\n'))
        if (args.dryRun) continue

        try {
            const rawBuf = await callOpenRouter(apiKey!, args.model, prompt)
            // gpt-5.4-image-2 returns 1024×1024. Crop+resize to 1200×630 OG aspect.
            const webp = await sharp(rawBuf)
                .resize({width: 1200, height: 630, fit: 'cover', position: 'centre'})
                .webp({quality: 88, effort: 6})
                .toBuffer()
            await fs.writeFile(outPath, webp)
            await client.from('posts').update({cover_image: publicPath}).eq('id', post.id)
            console.log(`  ok     ${publicPath}  (${(webp.length / 1024).toFixed(1)} KB)`)
            generated++
        } catch (e) {
            console.error(`  FAIL   ${post.slug}: ${e instanceof Error ? e.message : 'unknown error'}`)
            failed++
        }
    }

    console.log(`\nDone. generated=${generated} skipped=${skipped} failed=${failed}`)
    if (failed > 0) process.exit(2)
}

main().catch(err => { console.error(err); process.exit(1) })
