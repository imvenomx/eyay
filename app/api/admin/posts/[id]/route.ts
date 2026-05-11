import {NextRequest, NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'
import {hasValidSession} from '@/lib/admin-auth'
import {deletePost, getAdminPostById, PostUpdateSchema, updatePost} from '@/lib/store'

interface RouteContext {
    params: Promise<{id: string}>
}

export async function PATCH(req: NextRequest, {params}: RouteContext) {
    if (!(await hasValidSession())) {
        return NextResponse.json({error: 'Non autorizzato'}, {status: 401})
    }
    const {id} = await params
    let body: unknown
    try { body = await req.json() } catch { return NextResponse.json({error: 'JSON non valido'}, {status: 400}) }

    const parsed = PostUpdateSchema.safeParse(body)
    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) {
            const key = issue.path[0]
            if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message
        }
        return NextResponse.json({error: 'Validation failed', fieldErrors}, {status: 400})
    }

    const previous = await getAdminPostById(id)
    if (!previous) return NextResponse.json({error: 'Articolo non trovato'}, {status: 404})

    try {
        const updated = await updatePost(id, parsed.data)
        if (!updated) return NextResponse.json({error: 'Articolo non trovato'}, {status: 404})
        revalidatePath('/blog')
        revalidatePath(`/blog/${updated.slug}`)
        if (previous.slug !== updated.slug) revalidatePath(`/blog/${previous.slug}`)
        revalidatePath('/admin/blogs')
        return NextResponse.json({ok: true, id: updated.id, slug: updated.slug, published: updated.published})
    } catch (e) {
        const msg = e instanceof Error ? e.message : 'unknown'
        if (msg === 'SLUG_EXISTS') {
            return NextResponse.json({error: 'Slug già usato', fieldErrors: {slug: 'Slug già in uso'}}, {status: 409})
        }
        return NextResponse.json({error: 'Errore aggiornamento'}, {status: 500})
    }
}

export async function DELETE(_req: NextRequest, {params}: RouteContext) {
    if (!(await hasValidSession())) {
        return NextResponse.json({error: 'Non autorizzato'}, {status: 401})
    }
    const {id} = await params
    const previous = await getAdminPostById(id)
    if (!previous) return NextResponse.json({error: 'Articolo non trovato'}, {status: 404})

    try {
        const removed = await deletePost(id)
        if (!removed) return NextResponse.json({error: 'Articolo non trovato'}, {status: 404})
        revalidatePath('/blog')
        revalidatePath(`/blog/${previous.slug}`)
        revalidatePath('/admin/blogs')
        return NextResponse.json({ok: true})
    } catch {
        return NextResponse.json({error: 'Errore eliminazione'}, {status: 500})
    }
}
