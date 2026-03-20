'use client'

import {useCallback, useEffect, useRef, useState, startTransition} from 'react'
import {useRouter, usePathname} from 'next/navigation'

function getPageLabel(href: string): string {
    if (href === '/') return '* HOME'
    const segment = href.split('/').filter(Boolean).pop() || ''
    return '* ' + segment.replace(/-/g, ' ').toUpperCase()
}

export default function TransitionOverlay() {
    const router = useRouter()
    const pathname = usePathname()
    const [label, setLabel] = useState('')
    const topRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const isAnimating = useRef(false)
    const pendingHref = useRef<string | null>(null)

    // When pathname changes (navigation complete), open doors
    useEffect(() => {
        if (!pendingHref.current) return
        if (pathname !== pendingHref.current) return
        pendingHref.current = null

        const top = topRef.current, bottom = bottomRef.current, text = textRef.current
        if (!top || !bottom || !text) { isAnimating.current = false; return }

        const timer = setTimeout(async () => {
            try {
                const gsap = (await import('gsap')).default
                window.scrollTo(0, 0)
                gsap.timeline({onComplete: () => { isAnimating.current = false }})
                    .to(text, {opacity: 0, duration: 0.2}, '+=0.15')
                    .to(top, {yPercent: -100, duration: 0.5, ease: 'power3.inOut'})
                    .to(bottom, {yPercent: 100, duration: 0.5, ease: 'power3.inOut'}, '<')
                    .set([top, bottom, text], {display: 'none'})
            } catch { isAnimating.current = false }
        }, 100)

        return () => clearTimeout(timer)
    }, [pathname])

    // Intercept link clicks
    useEffect(() => {
        const handleClick = async (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a[href]')
            if (!anchor) return
            const href = anchor.getAttribute('href')
            if (!href) return
            if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
            if (isAnimating.current) return
            const cleanHref = href.split('#')[0] || '/'
            const cleanPathname = pathname.split('#')[0] || '/'
            if (cleanHref === cleanPathname) return

            e.preventDefault()
            isAnimating.current = true
            pendingHref.current = cleanHref

            const pageLabel = getPageLabel(href)
            setLabel(pageLabel)

            try {
                const gsap = (await import('gsap')).default
                const top = topRef.current!, bottom = bottomRef.current!, text = textRef.current!

                top.style.display = 'block'
                bottom.style.display = 'block'
                text.style.display = 'flex'

                // Close doors
                await new Promise<void>(resolve => {
                    gsap.timeline({onComplete: resolve})
                        .set(top, {yPercent: -100})
                        .set(bottom, {yPercent: 100})
                        .set(text, {opacity: 0})
                        .to(top, {yPercent: 0, duration: 0.4, ease: 'power3.inOut'})
                        .to(bottom, {yPercent: 0, duration: 0.4, ease: 'power3.inOut'}, '<')
                        .to(text, {opacity: 1, duration: 0.2}, '-=0.1')
                })

                // Navigate using Next.js router (no full reload = no error flash)
                startTransition(() => {
                    router.push(href)
                })
            } catch {
                startTransition(() => { router.push(href) })
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [pathname, router])

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[9998] pointer-events-none">
            <div ref={topRef} className="absolute top-0 left-0 w-full h-[50vh] bg-black" style={{display: 'none'}}/>
            <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-black" style={{display: 'none'}}/>
            <div ref={textRef} className="absolute inset-0 items-center justify-center z-10" style={{display: 'none', opacity: 0}}>
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.04]"/>
                <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/[0.04]"/>
                <span className="font-vcr-mono text-white text-sm tracking-[0.3em] uppercase relative z-10">{label}</span>
            </div>
        </div>
    )
}
