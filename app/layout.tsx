import React from "react"
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'
import {LanguageProvider} from "@/lib/language-context";
import SiteChrome from "@/components/site-chrome";
import JsonLd from "@/components/json-ld";
import {organizationSchema, websiteSchema, localBusinessSchema} from "@/lib/schemas";
import {SITE_URL, siteOgImage} from "@/lib/site";

const _geist = Geist({subsets: ["latin"]});
const _geistMono = Geist_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        default: 'Eey Aay — Soluzioni AI & Automazione per Aziende Moderne',
        template: '%s | Eey Aay',
    },
    description: 'Eey Aay aiuta le aziende ad automatizzare le operazioni, implementare assistenti AI, migliorare l\'esperienza cliente e costruire sistemi digitali scalabili che generano crescita reale.',
    keywords: ['AI', 'automazione', 'chatbot AI', 'agenti vocali', 'trasformazione digitale', 'CRM', 'RPA', 'machine learning', 'sviluppo web', 'SEO', 'e-commerce', 'Italia'],
    authors: [{name: 'Eey Aay'}],
    creator: 'Eey Aay',
    metadataBase: new URL('https://www.eeyaay.it'),
    openGraph: {
        type: 'website',
        locale: 'it_IT',
        url: 'https://www.eeyaay.it',
        siteName: 'Eey Aay',
        title: 'Eey Aay — Soluzioni AI & Automazione per Aziende Moderne',
        description: 'Aiutiamo le aziende ad automatizzare i workflow, implementare assistenti AI, migliorare l\'esperienza cliente e costruire sistemi digitali scalabili.',
        images: [{url: siteOgImage({title: 'Eey Aay', subtitle: 'AI & Automazione per il Business Moderno', eyebrow: 'Eey Aay // Italia'}), width: 1200, height: 630, alt: 'Eey Aay — AI & Automazione'}],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eey Aay — Soluzioni AI & Automazione',
        description: 'Aiutiamo le aziende ad automatizzare le operazioni e costruire sistemi AI che scalano.',
        images: [siteOgImage({title: 'Eey Aay', subtitle: 'AI & Automazione per il Business Moderno', eyebrow: 'Eey Aay // Italia'})],
    },
    robots: {index: true, follow: true},
    icons: {icon: [{url: '/favicon.svg', type: 'image/svg+xml'}]},
    manifest: '/manifest.webmanifest',
    appleWebApp: {
        capable: true,
        title: 'Eey Aay',
        statusBarStyle: 'black-translucent',
    },
    alternates: {
        canonical: SITE_URL,
        // Same-URL multilingual: the IT/EN toggle is a client-side preference,
        // not a separate URL. Both hreflang values point to the same canonical.
        languages: {
            'it-IT': SITE_URL,
            'en-US': SITE_URL,
            'x-default': SITE_URL,
        },
    },
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="it" className="dark" suppressHydrationWarning>
        <head>
            <JsonLd data={organizationSchema()}/>
            <JsonLd data={websiteSchema()}/>
            <JsonLd data={localBusinessSchema()}/>
        </head>
        <body className="font-sans antialiased bg-black" suppressHydrationWarning>
        <LanguageProvider>
            <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
        </body>
        </html>
    )
}
