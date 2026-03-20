'use client'
import {useEffect, useRef, useState, useCallback} from 'react'
import Image from 'next/image'

const PARTICLE_COUNT = 80

export default function SplashScreen() {
    const [visible, setVisible] = useState(false)
    const [entered, setEntered] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Check on mount only (avoids hydration mismatch)
    useEffect(() => {
        if (!sessionStorage.getItem('ey-entered')) {
            setVisible(true)
        }
        setMounted(true)
    }, [])
    const topRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particles = useRef<{x: number; y: number; vx: number; vy: number; size: number}[]>([])
    const rafRef = useRef<number>(0)

    // Init particles
    useEffect(() => {
        if (!visible) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
        resize()
        window.addEventListener('resize', resize)

        // Create particles
        particles.current = Array.from({length: PARTICLE_COUNT}, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: 1 + Math.random() * 1.5,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'rgba(255,255,255,0.1)'
            particles.current.forEach(p => {
                p.x += p.vx
                p.y += p.vy
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            })
            rafRef.current = requestAnimationFrame(draw)
        }
        draw()

        return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
    }, [visible])

    // Lock scroll when visible
    useEffect(() => {
        if (visible) {
            document.documentElement.classList.add('no-scroll')
        } else {
            document.documentElement.classList.remove('no-scroll')
        }
        return () => { document.documentElement.classList.remove('no-scroll') }
    }, [visible])

    const handleEnter = useCallback(async () => {
        if (entered) return
        setEntered(true)
        sessionStorage.setItem('ey-entered', '1')
        document.documentElement.classList.remove('no-scroll')

        // Start ambient audio
        try {
            const audio = new Audio('/ambient.mp3')
            audio.loop = true
            audio.volume = 0.02
            audio.play()
            // Store globally so it persists across the session
            ;(window as any).__eyAudio = audio
        } catch {}

        try {
            const gsap = (await import('gsap')).default
            const top = topRef.current, bottom = bottomRef.current
            if (!top || !bottom) { setVisible(false); return }

            await new Promise<void>(resolve => {
                gsap.timeline({onComplete: resolve})
                    .to(top, {yPercent: -100, duration: 0.6, ease: 'power3.inOut', delay: 0.15})
                    .to(bottom, {yPercent: 100, duration: 0.6, ease: 'power3.inOut'}, '<')
            })
        } catch {}

        setVisible(false)
    }, [entered])

    if (!visible) return null

    return (
        <div className="fixed inset-0 z-[10000]">
            {/* Top half */}
            <div ref={topRef} className="absolute top-0 left-0 w-full h-[50vh] bg-black"/>
            {/* Bottom half */}
            <div ref={bottomRef} className="absolute bottom-0 left-0 w-full h-[50vh] bg-black"/>

            {/* Particles canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-10"/>

            {/* Center content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                {/* Logo */}
                <div className="relative w-[140px] h-[40px] mb-12">
                    <Image src="/eylogo.png" alt="Eey Aay" fill className="object-contain" priority/>
                </div>

                {/* Enter button with crosshair border */}
                <button
                    onClick={handleEnter}
                    className="group relative px-10 py-3 cursor-pointer"
                >
                    {/* Crosshair border — 4 corner lines */}
                    <div className="absolute top-0 left-0 w-4 h-px bg-white/40"/>
                    <div className="absolute top-0 left-0 w-px h-4 bg-white/40"/>
                    <div className="absolute top-0 right-0 w-4 h-px bg-white/40"/>
                    <div className="absolute top-0 right-0 w-px h-4 bg-white/40"/>
                    <div className="absolute bottom-0 left-0 w-4 h-px bg-white/40"/>
                    <div className="absolute bottom-0 left-0 w-px h-4 bg-white/40"/>
                    <div className="absolute bottom-0 right-0 w-4 h-px bg-white/40"/>
                    <div className="absolute bottom-0 right-0 w-px h-4 bg-white/40"/>

                    <span className="font-vcr-mono text-white/70 text-sm tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                        ENTRA
                    </span>
                </button>
            </div>
        </div>
    )
}
