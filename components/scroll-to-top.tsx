'use client'
import React, {useEffect, useState} from 'react'

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return
        setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
        const onScroll = () => setVisible(window.scrollY > 600)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollUp = () => {
        if (typeof window === 'undefined') return
        window.scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'})
    }

    return (
        <button
            type="button"
            onClick={scrollUp}
            aria-label="Torna in cima alla pagina"
            data-magnetic
            className={`fixed bottom-6 right-6 z-[9990] w-11 h-11 flex items-center justify-center border border-white/15 bg-black/70 backdrop-blur-md text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
            }`}>
            <span className="absolute top-0 left-0 w-2 h-px bg-white/40"/>
            <span className="absolute top-0 left-0 w-px h-2 bg-white/40"/>
            <span className="absolute top-0 right-0 w-2 h-px bg-white/40"/>
            <span className="absolute top-0 right-0 w-px h-2 bg-white/40"/>
            <span className="absolute bottom-0 left-0 w-2 h-px bg-white/40"/>
            <span className="absolute bottom-0 left-0 w-px h-2 bg-white/40"/>
            <span className="absolute bottom-0 right-0 w-2 h-px bg-white/40"/>
            <span className="absolute bottom-0 right-0 w-px h-2 bg-white/40"/>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    )
}
