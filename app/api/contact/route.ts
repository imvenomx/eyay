import {NextRequest, NextResponse} from 'next/server'
import {addContact, ContactSchema} from '@/lib/store'

export async function POST(req: NextRequest) {
    let body: unknown
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
    }

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) {
            const key = issue.path[0]
            if (typeof key === 'string' && !fieldErrors[key]) {
                fieldErrors[key] = issue.message
            }
        }
        return NextResponse.json({error: 'Validation failed', fieldErrors}, {status: 400})
    }

    try {
        const record = await addContact(parsed.data)
        return NextResponse.json({ok: true, id: record.id})
    } catch {
        return NextResponse.json({error: 'Failed to save submission'}, {status: 500})
    }
}
