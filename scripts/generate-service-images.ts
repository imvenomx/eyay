#!/usr/bin/env tsx
/**
 * generate-service-images.ts
 *
 * Generates one image per content block for each service in lib/services-data.ts
 * and saves them to /public/services/<slug>-<n>.webp.
 *
 * Usage:
 *   OPENROUTER_API_KEY=sk-or-... npx tsx scripts/generate-service-images.ts
 *
 * Flags:
 *   --service=<slug>  only regenerate this service
 *   --block=<index>   only regenerate block N (1-based), requires --service
 *   --dry-run         print prompts without calling the API
 *   --model=<id>      override model id (default: openai/gpt-image-1)
 *   --force           overwrite existing files (default: skip if file exists)
 *
 * Cost: ~$2-3 total for all 45 images on OpenRouter at GPT-Image pricing.
 */
import {promises as fs} from 'fs'
import path from 'path'
import sharp from 'sharp'
import {allServices, type ServiceData} from '../lib/services-data'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

interface Args {
    service?: string
    block?: number
    dryRun: boolean
    model: string
    force: boolean
}

function parseArgs(argv: string[]): Args {
    const args: Args = {dryRun: false, model: 'openai/gpt-5.4-image-2', force: false}
    for (const a of argv) {
        if (a === '--dry-run') args.dryRun = true
        else if (a === '--force') args.force = true
        else if (a.startsWith('--service=')) args.service = a.slice('--service='.length)
        else if (a.startsWith('--block=')) args.block = parseInt(a.slice('--block='.length), 10)
        else if (a.startsWith('--model=')) args.model = a.slice('--model='.length)
    }
    return args
}

const STYLE_BASE = [
    'abstract dark technical illustration',
    'monochromatic black and graphite tones with a single subtle green accent',
    'isometric low-poly geometry, sparse composition',
    'precise blueprint feel, thin grid lines, crosshair markers, light noise',
    'studio lighting from upper-left, deep shadows',
    'no human faces, no logos, no readable text',
    'editorial / technical brand asset for a B2B AI consultancy',
    'square 1024x1024 framing, generous negative space',
].join(', ')

const COMPOSITION_VARIANTS = [
    'centered single hero object, slow tilt-shift focus, generous breathing room',
    'overhead schematic layout with multiple small modules connected by thin lines',
    'cross-section / exploded view, sketchy annotations implied',
] as const

function promptForBlock(service: ServiceData, blockIndex: number): string {
    const block = service.blocks[blockIndex]
    const composition = COMPOSITION_VARIANTS[blockIndex % COMPOSITION_VARIANTS.length]
    return [
        `${block.title} — ${service.title}.`,
        `Subject hint: ${block.desc}`,
        `Composition: ${composition}.`,
        `Style: ${STYLE_BASE}.`,
        `Mood: precise, clinical, confident. Not glowing dots or stock-tech cliché.`,
    ].join('\n')
}

async function ensureDir(p: string) {
    await fs.mkdir(p, {recursive: true})
}

async function fileExists(p: string): Promise<boolean> {
    try { await fs.access(p); return true } catch { return false }
}

interface ChatResponse {
    choices?: Array<{
        message?: {
            content?: string | Array<{
                type?: string
                image_url?: {url?: string} | string
                text?: string
            }>
            images?: Array<{
                type?: string
                image_url?: {url?: string} | string
            }>
        }
    }>
    error?: {message?: string; code?: string}
}

/** Extract a base64/data URL from a wide variety of OpenRouter image response shapes. */
function findImageUrl(data: ChatResponse): string | null {
    const msg = data.choices?.[0]?.message
    if (!msg) return null
    // Shape A: message.images: [{image_url: {url: "data:..."}}, ...]
    if (Array.isArray(msg.images) && msg.images.length > 0) {
        const first = msg.images[0]
        const u = typeof first.image_url === 'string' ? first.image_url : first.image_url?.url
        if (u) return u
    }
    // Shape B: message.content is an array of content blocks (multimodal)
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
            'X-Title': 'Eey Aay service image generator',
        },
        body: JSON.stringify({
            model,
            messages: [{role: 'user', content: prompt}],
            modalities: ['image', 'text'],
            // Cap explicitly. Without this OpenRouter reserves the model's full
            // context (~65k tokens / ~$0.98 each), which trips the weekly
            // per-key cap after ~30 requests even though actual usage is tiny.
            max_tokens: 8192,
        }),
    })
    const text = await res.text()
    let data: ChatResponse = {}
    try { data = JSON.parse(text) } catch { /* keep raw text in error */ }
    if (!res.ok || data.error) {
        const msg = data.error?.message || `HTTP ${res.status}: ${text.slice(0, 400)}`
        throw new Error(`OpenRouter request failed: ${msg}`)
    }
    const url = findImageUrl(data)
    if (!url) throw new Error(`OpenRouter returned no image. Response: ${text.slice(0, 400)}`)

    // url may be a data:image/png;base64,XXX or a real https URL
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
        console.error('ERROR: OPENROUTER_API_KEY is not set. Add it to .env.local or export it.')
        console.error('Tip: re-run with --dry-run to preview prompts without calling the API.')
        process.exit(1)
    }

    const outDir = path.join(process.cwd(), 'public', 'services')
    await ensureDir(outDir)

    const targets = args.service
        ? allServices.filter(s => s.slug === args.service)
        : allServices
    if (args.service && targets.length === 0) {
        console.error(`ERROR: no service with slug "${args.service}"`)
        process.exit(1)
    }

    let generated = 0
    let skipped = 0
    let failed = 0

    for (const service of targets) {
        const blocks = service.blocks
        for (let i = 0; i < blocks.length; i++) {
            if (args.block !== undefined && args.block - 1 !== i) continue
            const outPath = path.join(outDir, `${service.slug}-${i + 1}.webp`)
            if (!args.force && (await fileExists(outPath))) {
                console.log(`  skip   ${service.slug}-${i + 1} (exists, use --force to overwrite)`)
                skipped++
                continue
            }
            const prompt = promptForBlock(service, i)
            console.log(`\n[${service.slug} #${i + 1}] ${blocks[i].title}`)
            console.log(prompt.split('\n').map(l => '    ' + l).join('\n'))
            if (args.dryRun) continue
            const MAX_ATTEMPTS = 3
            let lastError: string | null = null
            let success = false
            for (let attempt = 1; attempt <= MAX_ATTEMPTS && !success; attempt++) {
                try {
                    const pngBuf = await callOpenRouter(apiKey!, args.model, prompt)
                    const webpBuf = await sharp(pngBuf).webp({quality: 88, effort: 6}).toBuffer()
                    await fs.writeFile(outPath, webpBuf)
                    console.log(`  ok     ${outPath} (${(webpBuf.length / 1024).toFixed(1)} KB)${attempt > 1 ? ` [attempt ${attempt}]` : ''}`)
                    generated++
                    success = true
                } catch (e) {
                    lastError = e instanceof Error ? e.message : 'unknown error'
                    const transient = /fetch failed|Network connection lost|terminated|no image|ETIMEDOUT|ECONNRESET|5\d\d/i.test(lastError)
                    if (attempt < MAX_ATTEMPTS && transient) {
                        const backoffMs = attempt * 2000
                        console.log(`  retry  ${service.slug}-${i + 1} in ${backoffMs}ms (${attempt}/${MAX_ATTEMPTS}): ${lastError.slice(0, 80)}`)
                        await new Promise(r => setTimeout(r, backoffMs))
                    } else {
                        break
                    }
                }
            }
            if (!success) {
                console.error(`  FAIL   ${service.slug}-${i + 1}: ${lastError}`)
                failed++
            }
        }
    }

    console.log(`\nDone. generated=${generated} skipped=${skipped} failed=${failed}`)
    if (failed > 0) process.exit(2)
}

main().catch(err => { console.error(err); process.exit(1) })
