import React from "react"
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import FooterSection from "@/components/footer";
import {HeroHeader} from "@/components/header";
import CustomCursor from "@/components/custom-cursor";
import TransitionOverlay from "@/components/transition-layout";
import {LanguageProvider} from "@/lib/language-context";
import SplashScreen from "@/components/splash-screen";
import AudioPlayer from "@/components/audio-player";
import ErrorSuppressor from "@/components/error-suppressor";

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://eyay.vercel.app'),
    openGraph: {
        type: 'website',
        locale: 'it_IT',
        siteName: 'Eey Aay',
        title: 'Eey Aay — Soluzioni AI & Automazione per Aziende Moderne',
        description: 'Aiutiamo le aziende ad automatizzare i workflow, implementare assistenti AI, migliorare l\'esperienza cliente e costruire sistemi digitali scalabili.',
        images: [{url: '/ogimg.png', width: 1200, height: 630, alt: 'Eey Aay — AI & Automazione'}],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eey Aay — Soluzioni AI & Automazione',
        description: 'Aiutiamo le aziende ad automatizzare le operazioni e costruire sistemi AI che scalano.',
        images: ['/ogimg.png'],
    },
    robots: {index: true, follow: true},
    icons: {icon: [{url: '/favicon.svg', type: 'image/svg+xml'}]},
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="it" className="dark" suppressHydrationWarning>
        <head>
            <ErrorSuppressor/>
            <Script src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js" strategy="lazyOnload" type="module"/>
        </head>
        <body className="font-sans antialiased bg-black" suppressHydrationWarning>
        <LanguageProvider>
            <SplashScreen/>
            <AudioPlayer/>
            <CustomCursor/>
            <TransitionOverlay/>
            <HeroHeader/>
            {children}
            <FooterSection/>
        </LanguageProvider>
        </body>
        </html>
    )
}
