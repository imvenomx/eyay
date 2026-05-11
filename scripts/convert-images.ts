#!/usr/bin/env tsx
/**
 * convert-images.ts
 *
 * Converts every /public/services/*.png to .webp at high quality,
 * deletes the originals on success.
 *
 *   npx tsx scripts/convert-images.ts
 *
 * Flags:
 *   --dry-run    only print what would be done
 *   --keep-png   keep the original PNGs after conversion (default: delete)
 *   --quality=N  WebP quality (0-100, default 88 — visually lossless)
 */
import {promises as fs} from 'fs'
import path from 'path'
import sharp from 'sharp'

interface Args {
    dryRun: boolean
    keepPng: boolean
    quality: number
}

function parseArgs(argv: string[]): Args {
    const args: Args = {dryRun: false, keepPng: false, quality: 88}
    for (const a of argv) {
        if (a === '--dry-run') args.dryRun = true
        else if (a === '--keep-png') args.keepPng = true
        else if (a.startsWith('--quality=')) args.quality = parseInt(a.slice('--quality='.length), 10)
    }
    return args
}

async function main() {
    const args = parseArgs(process.argv.slice(2))
    const dir = path.join(process.cwd(), 'public', 'services')

    let entries: string[] = []
    try {
        entries = (await fs.readdir(dir)).filter(f => f.toLowerCase().endsWith('.png'))
    } catch (e) {
        console.error(`Could not read ${dir}: ${(e as Error).message}`)
        process.exit(1)
    }

    if (entries.length === 0) {
        console.log(`No PNGs in ${dir}. Nothing to do.`)
        return
    }

    console.log(`Found ${entries.length} PNG(s). Converting at quality=${args.quality}${args.dryRun ? ' (DRY RUN)' : ''}`)

    let pngBytes = 0
    let webpBytes = 0
    let converted = 0
    let failed = 0

    for (const file of entries) {
        const pngPath = path.join(dir, file)
        const webpPath = path.join(dir, file.replace(/\.png$/i, '.webp'))
        const pngStat = await fs.stat(pngPath)
        pngBytes += pngStat.size

        if (args.dryRun) {
            console.log(`  would convert  ${file}  (${(pngStat.size / 1024).toFixed(0)} KB → .webp)`)
            continue
        }

        try {
            const buf = await sharp(pngPath)
                .webp({quality: args.quality, effort: 6})
                .toBuffer()
            await fs.writeFile(webpPath, buf)
            webpBytes += buf.length
            const saved = pngStat.size - buf.length
            const pct = ((saved / pngStat.size) * 100).toFixed(0)
            console.log(`  ok  ${file}  ${(pngStat.size / 1024).toFixed(0)} KB → ${(buf.length / 1024).toFixed(0)} KB  (-${pct}%)`)
            converted++
            if (!args.keepPng) {
                await fs.unlink(pngPath)
            }
        } catch (e) {
            console.error(`  FAIL  ${file}: ${(e as Error).message}`)
            failed++
        }
    }

    if (!args.dryRun) {
        const savedBytes = pngBytes - webpBytes
        const savedMb = (savedBytes / (1024 * 1024)).toFixed(2)
        console.log(`\nDone. converted=${converted} failed=${failed}`)
        console.log(`Total: ${(pngBytes / (1024 * 1024)).toFixed(2)} MB → ${(webpBytes / (1024 * 1024)).toFixed(2)} MB  (saved ${savedMb} MB)`)
        if (!args.keepPng && failed === 0) {
            console.log('Original PNGs deleted.')
        }
    }
    if (failed > 0) process.exit(2)
}

main().catch(err => { console.error(err); process.exit(1) })
