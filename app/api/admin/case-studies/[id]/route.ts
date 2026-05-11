import {NextRequest, NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'
import {hasValidSession} from '@/lib/admin-auth'
import {deleteCaseStudy, getAdminCaseStudyById, CaseStudyUpdateSchema, updateCaseStudy} from '@/lib/store'

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

    const parsed = CaseStudyUpdateSchema.safeParse(body)
    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) {
            const key = issue.path[0]
            if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message
        }
        return NextResponse.json({error: 'Validation failed', fieldErrors}, {status: 400})
    }

    const previous = await getAdminCaseStudyById(id)
    if (!previous) return NextResponse.json({error: 'Case study non trovato'}, {status: 404})

    try {
        const updated = await updateCaseStudy(id, parsed.data)
        if (!updated) return NextResponse.json({error: 'Case study non trovato'}, {status: 404})
        revalidatePath('/case-studies')
        revalidatePath(`/case-studies/${updated.slug}`)
        if (previous.slug !== updated.slug) revalidatePath(`/case-studies/${previous.slug}`)
        revalidatePath('/admin/case-studies')
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
    const previous = await getAdminCaseStudyById(id)
    if (!previous) return NextResponse.json({error: 'Case study non trovato'}, {status: 404})

    try {
        const removed = await deleteCaseStudy(id)
        if (!removed) return NextResponse.json({error: 'Case study non trovato'}, {status: 404})
        revalidatePath('/case-studies')
        revalidatePath(`/case-studies/${previous.slug}`)
        revalidatePath('/admin/case-studies')
        return NextResponse.json({ok: true})
    } catch {
        return NextResponse.json({error: 'Errore eliminazione'}, {status: 500})
    }
}
