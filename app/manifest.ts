import type {MetadataRoute} from 'next'
import {SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE} from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} — ${SITE_TAGLINE}`,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        orientation: 'portrait-primary',
        lang: 'it-IT',
        categories: ['business', 'productivity', 'developer'],
        icons: [
            {src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any'},
            {src: '/eylogo.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
            {src: '/eylogo.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
        ],
    }
}
