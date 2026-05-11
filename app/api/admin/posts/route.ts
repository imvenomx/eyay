import {NextRequest, NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'
import {hasValidSession} from '@/lib/admin-auth'
import {addPost, PostInputSchema} from '@/lib/store'

export async function POST(req: NextRequest) {
    if (!(await hasValidSession())) {
        return NextResponse.json({error: 'Non autorizzato'}, {status: 401})
    }
    let body: unknown
    try { body = await req.json() } catch { return NextResponse.json({error: 'JSON non valido'}, {status: 400}) }

    const parsed = PostInputSchema.safeParse(body)
    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) {
            const key = issue.path[0]
            if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message
        }
        return NextResponse.json({error: 'Validation failed', fieldErrors}, {status: 400})
    }

    try {
        const record = await addPost(parsed.data)
        revalidatePath('/blog')
        revalidatePath(`/blog/${record.slug}`)
        revalidatePath('/admin/blogs')
        return NextResponse.json({ok: true, id: record.id, slug: record.slug})
    } catch (e) {
        const msg = e instanceof Error ? e.message : 'unknown'
        if (msg === 'SLUG_EXISTS') {
            return NextResponse.json({error: 'Slug già usato', fieldErrors: {slug: 'Slug già in uso'}}, {status: 409})
        }
        return NextResponse.json({error: 'Errore salvataggio'}, {status: 500})
    }
}
