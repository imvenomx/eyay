import 'server-only'
import {createHmac, timingSafeEqual} from 'crypto'
import {cookies} from 'next/headers'

const COOKIE_NAME = 'eyay_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getPassword(): string | null {
    return process.env.ADMIN_PASSWORD || null
}

function getSecret(): string {
    return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'eyay-dev-secret-change-me'
}

function signToken(password: string): string {
    return createHmac('sha256', getSecret()).update(`admin:${password}`).digest('hex')
}

export function isAdminConfigured(): boolean {
    return !!getPassword()
}

export function verifyPassword(input: string): boolean {
    const expected = getPassword()
    if (!expected) return false
    const a = Buffer.from(input)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
}

export function makeSessionToken(): string | null {
    const pw = getPassword()
    if (!pw) return null
    return signToken(pw)
}

export async function hasValidSession(): Promise<boolean> {
    const pw = getPassword()
    if (!pw) return false
    const jar = await cookies()
    const token = jar.get(COOKIE_NAME)?.value
    if (!token) return false
    const expected = signToken(pw)
    if (token.length !== expected.length) return false
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected))
}

export const ADMIN_COOKIE = {
    name: COOKIE_NAME,
    maxAge: COOKIE_MAX_AGE,
}
