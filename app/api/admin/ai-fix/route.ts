import {NextRequest, NextResponse} from 'next/server'
import {hasValidSession} from '@/lib/admin-auth'
import {slugify} from '@/lib/slugify'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = process.env.AI_FIX_MODEL || 'openai/gpt-4o-mini'

interface FixRequest {
    field: 'title' | 'excerpt' | 'slug' | 'body'
    title?: string
    excerpt?: string
    slug?: string
    body?: string
    /** Type of content — affects prompt language nuance */
    kind?: 'post' | 'case-study'
}

const SYSTEM_PROMPT = `Sei un editor SEO senior italiano per un\u2019azienda B2B di AI e automazione (Eey Aay).
Rispondi SEMPRE in italiano (a meno che il contenuto non sia chiaramente in inglese).
Restituisci SOLO il valore richiesto. Niente preamboli, niente virgolette, niente spiegazioni.`

function userPromptFor(req: FixRequest): string {
    const ctx = `Titolo attuale: ${req.title || '(vuoto)'}\nEstratto attuale: ${req.excerpt || '(vuoto)'}\nSlug attuale: ${req.slug || '(vuoto)'}`

    switch (req.field) {
        case 'title':
            return `${ctx}\n\nRiscrivi il titolo in modo che sia compreso tra 50 e 65 caratteri. Includi parole chiave naturali tratte dallo slug o dall\u2019estratto. Niente clickbait. Restituisci SOLO il titolo.`

        case 'excerpt':
            return `${ctx}\n\nRiscrivi l\u2019estratto / meta description in modo che sia compreso tra 140 e 158 caratteri. Cattura l\u2019essenza, includi una promessa concreta, lascia spazio a chiarezza. Restituisci SOLO l\u2019estratto.`

        case 'slug':
            // Slug is deterministic — pure function, no model call needed (handled before request)
            return ''

        case 'body':
            return `Articolo attuale (markdown):\n\n${req.body || ''}\n\n---\n\nIl corpo manca di heading H2. Riscrivi il corpo aggiungendo 2-4 heading H2 (## Heading) per spezzare le sezioni più logiche. NON cambiare il contenuto in sé — solo aggiungi gli H2 al posto giusto. Restituisci il corpo aggiornato in markdown, niente preambolo.`

        default:
            return ctx
    }
}

export async function POST(req: NextRequest) {
    if (!(await hasValidSession())) {
        return NextResponse.json({error: 'Non autorizzato'}, {status: 401})
    }
    let body: FixRequest
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({error: 'JSON non valido'}, {status: 400})
    }

    // Slug is purely deterministic — no AI call needed
    if (body.field === 'slug') {
        const source = body.title || body.slug || ''
        const fixed = slugify(source)
        if (!fixed) return NextResponse.json({error: 'Impossibile generare slug — inserisci prima un titolo.'}, {status: 400})
        return NextResponse.json({ok: true, value: fixed})
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
        return NextResponse.json({error: 'OPENROUTER_API_KEY non configurato sul server.'}, {status: 503})
    }

    const userMsg = userPromptFor(body)
    if (!userMsg) {
        return NextResponse.json({error: 'Campo non supportato.'}, {status: 400})
    }

    try {
        const res = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://www.eeyaay.it',
                'X-Title': 'Eey Aay SEO Fixer',
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {role: 'system', content: SYSTEM_PROMPT},
                    {role: 'user', content: userMsg},
                ],
                temperature: 0.5,
                max_tokens: body.field === 'body' ? 4000 : 200,
            }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok || data.error) {
            const msg = data.error?.message || `HTTP ${res.status}`
            return NextResponse.json({error: `AI provider error: ${msg}`}, {status: 502})
        }
        const value = (data.choices?.[0]?.message?.content || '').trim()
        if (!value) return NextResponse.json({error: 'Risposta AI vuota'}, {status: 502})
        // Strip surrounding quotes if model added them
        const cleaned = value.replace(/^["'\u201C\u201D\u2018\u2019]+|["'\u201C\u201D\u2018\u2019]+$/g, '')
        return NextResponse.json({ok: true, value: cleaned, model: MODEL})
    } catch (e) {
        return NextResponse.json({error: `Errore: ${e instanceof Error ? e.message : 'unknown'}`}, {status: 500})
    }
}
