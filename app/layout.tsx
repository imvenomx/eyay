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

const _geist = Geist({subsets: ["latin"]});
const _geistMono = Geist_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'Eey Aay — AI & Automation Solutions for Modern Businesses',
    description: 'Eey Aay helps companies automate operations, deploy AI assistants, improve customer experience, and build scalable digital systems that drive real business growth.',
    icons: {icon: [{url: '/favicon.svg', type: 'image/svg+xml'}]},
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="it" className="dark">
        <head>
            <Script src="https://unpkg.com/@splinetool/viewer@1.9.48/build/spline-viewer.js" strategy="lazyOnload" type="module"/>
        </head>
        <body className="font-sans antialiased bg-black">
        <LanguageProvider>
            <SplashScreen/>
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
