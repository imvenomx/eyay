'use client'
import React, {useState, useEffect, useRef} from 'react'

interface ScrambleOnViewProps {
    children: string
    className?: string
    as?: React.ElementType
    duration?: number // ms — total decode time
    threshold?: number // 0..1 — intersection ratio that triggers
}

const TOTAL_FRAMES = 14
const FRAME_MS_DEFAULT = 45

export default function ScrambleOnView({
    children,
    className = '',
    as: Tag = 'span',
    duration,
    threshold = 0.4,
}: ScrambleOnViewProps) {
    const Component = Tag as any
    const ref = useRef<HTMLElement | null>(null)
    const [display, setDisplay] = useState(children)
    const [played, setPlayed] = useState(false)

    useEffect(() => {
        // If user prefers reduced motion, show plain text immediately.
        if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setDisplay(children)
            setPlayed(true)
            return
        }

        const el = ref.current
        if (!el || played) return

        const frameMs = duration ? Math.max(20, Math.floor(duration / TOTAL_FRAMES)) : FRAME_MS_DEFAULT

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setPlayed(true)
                    let frame = 0
                    setDisplay(scrambleFrame(children, 0))
                    const interval = setInterval(() => {
                        frame++
                        if (frame >= TOTAL_FRAMES) {
                            clearInterval(interval)
                            setDisplay(children)
                            return
                        }
                        setDisplay(scrambleFrame(children, frame / TOTAL_FRAMES))
                    }, frameMs)
                    observer.disconnect()
                    return
                }
            }
        }, {threshold})

        observer.observe(el)
        return () => observer.disconnect()
    }, [children, played, duration, threshold])

    return (
        <Component ref={ref} className={className} aria-label={children}>
            <span aria-hidden={!played}>{display}</span>
        </Component>
    )
}

function scrambleFrame(text: string, progress: number): string {
    const revealCount = Math.floor(progress * text.length)
    let out = ''
    for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ' || ch === '\n') {
            out += ch
        } else if (i < revealCount) {
            out += ch
        } else {
            out += Math.random() > 0.5 ? '1' : '0'
        }
    }
    return out
}
