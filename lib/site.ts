export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eeyaay.it').replace(/\/+$/, '')
export const SITE_NAME = 'Eey Aay'
export const SITE_TAGLINE = 'AI & Automazione per il Business Moderno'
export const SITE_DESCRIPTION = 'Eey Aay aiuta le aziende ad automatizzare le operazioni, implementare assistenti AI, migliorare l\u2019esperienza cliente e costruire sistemi digitali scalabili che generano crescita reale.'

export function absoluteUrl(path: string): string {
    if (!path) return SITE_URL
    if (/^https?:\/\//.test(path)) return path
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function siteOgImage(opts: {title?: string; subtitle?: string; eyebrow?: string} = {}): string {
    const params = new URLSearchParams()
    if (opts.title) params.set('title', opts.title)
    if (opts.subtitle) params.set('subtitle', opts.subtitle)
    if (opts.eyebrow) params.set('eyebrow', opts.eyebrow)
    const qs = params.toString()
    return `/api/og/site${qs ? `?${qs}` : ''}`
}
