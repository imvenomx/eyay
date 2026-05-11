import {NextRequest, NextResponse} from 'next/server'
import {addNewsletter, NewsletterSchema} from '@/lib/store'

export async function POST(req: NextRequest) {
    let body: unknown
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
    }

    const parsed = NewsletterSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({error: 'Invalid email'}, {status: 400})
    }

    try {
        const {duplicate} = await addNewsletter(parsed.data)
        return NextResponse.json({ok: true, duplicate})
    } catch {
        return NextResponse.json({error: 'Failed to save'}, {status: 500})
    }
}
