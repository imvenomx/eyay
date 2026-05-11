import {NextRequest, NextResponse} from 'next/server'
import {ADMIN_COOKIE, isAdminConfigured, makeSessionToken, verifyPassword} from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
    if (!isAdminConfigured()) {
        return NextResponse.json({error: 'ADMIN_PASSWORD env var not set'}, {status: 503})
    }
    let body: {password?: string} = {}
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({error: 'Invalid request'}, {status: 400})
    }
    const password = (body.password || '').trim()
    if (!password || !verifyPassword(password)) {
        return NextResponse.json({error: 'Password errata'}, {status: 401})
    }
    const token = makeSessionToken()
    if (!token) return NextResponse.json({error: 'Server error'}, {status: 500})

    const res = NextResponse.json({ok: true})
    res.cookies.set({
        name: ADMIN_COOKIE.name,
        value: token,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: ADMIN_COOKIE.maxAge,
    })
    return res
}
