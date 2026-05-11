'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'eyay_cookies_v1'
const COOKIE_NAME = 'eyay_cookies_v1'

type Choice = 'accept' | 'reject'

function readChoice(): Choice | null {
    if (typeof window === 'undefined') return null
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored === 'accept' || stored === 'reject') return stored
    } catch {}
    const match = document.cookie.match(/(?:^|; )eyay_cookies_v1=(accept|reject)/)
    return match ? (match[1] as Choice) : null
}

function persistChoice(choice: Choice) {
    try { window.localStorage.setItem(STORAGE_KEY, choice) } catch {}
    const maxAge = 60 * 60 * 24 * 365
    document.cookie = `${COOKIE_NAME}=${choice}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export default function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (readChoice() === null) {
            // Slight delay so the banner doesn't compete with the splash/hero on load
            const t = setTimeout(() => setVisible(true), 800)
            return () => clearTimeout(t)
        }
    }, [])

    const decide = (choice: Choice) => {
        persistChoice(choice)
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div
            role="region"
            aria-label="Cookie consent"
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9995]">
            <div className="relative bg-[#0a0a0a] text-white border border-white/15 p-5 md:p-6 shadow-2xl">
                {/* Crosshair corners */}
                <span className="absolute top-0 left-0 w-3 h-px bg-white/40"/>
                <span className="absolute top-0 left-0 w-px h-3 bg-white/40"/>
                <span className="absolute top-0 right-0 w-3 h-px bg-white/40"/>
                <span className="absolute top-0 right-0 w-px h-3 bg-white/40"/>
                <span className="absolute bottom-0 left-0 w-3 h-px bg-white/40"/>
                <span className="absolute bottom-0 left-0 w-px h-3 bg-white/40"/>
                <span className="absolute bottom-0 right-0 w-3 h-px bg-white/40"/>
                <span className="absolute bottom-0 right-0 w-px h-3 bg-white/40"/>

                <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">Cookies</p>
                </div>
                <p className="font-vcr text-base mb-2 leading-snug">Solo cookie tecnici, di default.</p>
                <p className="text-xs font-mono text-white/55 leading-relaxed mb-5">
                    Usiamo cookie tecnici necessari per il funzionamento del sito e, se acconsenti, analytics anonimi
                    per capire come migliorare. Niente tracciamento pubblicitario.
                    <Link href="/privacy" className="underline decoration-white/30 underline-offset-2 hover:decoration-white ml-1">
                        Dettagli
                    </Link>
                </p>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => decide('accept')}
                        data-magnetic
                        className="inline-flex items-center justify-center px-4 py-2 bg-white text-black text-[10px] font-vcr uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
                        Accetta tutto
                    </button>
                    <button
                        type="button"
                        onClick={() => decide('reject')}
                        className="inline-flex items-center justify-center px-4 py-2 border border-white/15 hover:border-white/40 text-[10px] font-vcr uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
                        Solo necessari
                    </button>
                </div>
            </div>
        </div>
    )
}
