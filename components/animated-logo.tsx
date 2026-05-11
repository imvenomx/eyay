'use client'
import React, {useState, useEffect, useRef} from 'react'

/**
 * Lightweight SVG-only logo with a hover glitch.
 * - Two "EEY AAY" copies offset by a few pixels for the glitch effect.
 * - On hover, the offset and color channels animate.
 * - Adopts color from currentColor so it inherits text color (light/dark nav).
 */
export default function AnimatedLogo({className = ''}: {className?: string}) {
    const [hovering, setHovering] = useState(false)
    const [scramble, setScramble] = useState('EEY AAY')
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (!hovering) {
            setScramble('EEY AAY')
            if (intervalRef.current) clearInterval(intervalRef.current)
            return
        }
        const base = 'EEY AAY'
        let frame = 0
        const total = 8
        intervalRef.current = setInterval(() => {
            frame++
            if (frame >= total) {
                if (intervalRef.current) clearInterval(intervalRef.current)
                setScramble(base)
                return
            }
            const reveal = Math.floor((frame / total) * base.length)
            setScramble(
                base.split('').map((c, i) => {
                    if (c === ' ') return ' '
                    if (i < reveal) return c
                    return Math.random() > 0.5 ? '1' : '0'
                }).join('')
            )
        }, 55)
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [hovering])

    return (
        <span
            className={`relative inline-block select-none ${className}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            aria-label="Eey Aay"
            role="img">
            <svg
                viewBox="0 0 200 56"
                width="100"
                height="28"
                className="block"
                aria-hidden="true">
                {/* Cyan ghost — visible only on hover */}
                <text
                    x="0"
                    y="40"
                    fontFamily="'VCR OSD Mono', monospace"
                    fontSize="36"
                    fontWeight="900"
                    fill="#22d3ee"
                    opacity={hovering ? 0.6 : 0}
                    style={{transition: 'opacity 0.2s, transform 0.2s', transform: hovering ? 'translate(2px, 1px)' : 'none', transformOrigin: '0 0'}}>
                    {scramble}
                </text>
                {/* Magenta ghost — visible only on hover */}
                <text
                    x="0"
                    y="40"
                    fontFamily="'VCR OSD Mono', monospace"
                    fontSize="36"
                    fontWeight="900"
                    fill="#f43f5e"
                    opacity={hovering ? 0.6 : 0}
                    style={{transition: 'opacity 0.2s, transform 0.2s', transform: hovering ? 'translate(-2px, -1px)' : 'none', transformOrigin: '0 0'}}>
                    {scramble}
                </text>
                {/* Main text */}
                <text
                    x="0"
                    y="40"
                    fontFamily="'VCR OSD Mono', monospace"
                    fontSize="36"
                    fontWeight="900"
                    fill="currentColor">
                    {scramble}
                </text>
            </svg>
        </span>
    )
}
