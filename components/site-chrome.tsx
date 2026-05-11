'use client'
import {usePathname} from 'next/navigation'
import React from 'react'
import FooterSection from '@/components/footer'
import {HeroHeader} from '@/components/header'
import CustomCursor from '@/components/custom-cursor'
import TransitionOverlay from '@/components/transition-layout'
import ScrollToTop from '@/components/scroll-to-top'
import CookieBanner from '@/components/cookie-banner'
import FaviconController from '@/components/favicon-controller'

export default function SiteChrome({children}: {children: React.ReactNode}) {
    const pathname = usePathname() || ''
    const isAdmin = pathname.startsWith('/admin')

    if (isAdmin) {
        return <>{children}</>
    }

    return (
        <>
            <CustomCursor/>
            <TransitionOverlay/>
            <HeroHeader/>
            {children}
            <FooterSection/>
            <ScrollToTop/>
            <CookieBanner/>
            <FaviconController/>
        </>
    )
}
