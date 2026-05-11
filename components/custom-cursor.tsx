'use client'
import {useEffect, useRef} from 'react'

const TRAIL_LENGTH = 6
const MAGNET_RADIUS = 90 // px — distance at which cursor snaps toward a magnetic element
const MAGNET_STRENGTH = 0.4 // 0..1 — how strongly the cursor pulls toward the element center

export default function CustomCursor() {
    const ref = useRef<HTMLDivElement>(null)
    const trailRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const cursor = ref.current
        if (!cursor || window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches) {
            if (cursor) cursor.style.display = 'none'
            trailRefs.current.forEach(t => { if (t) t.style.display = 'none' })
            return
        }

        let mx = -100, my = -100, cx = -100, cy = -100
        const trail: {x: number; y: number}[] = Array.from({length: TRAIL_LENGTH}, () => ({x: -100, y: -100}))

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
        document.addEventListener('mousemove', onMove, {passive: true})

        let rafId: number
        const raf = () => {
            // Find nearest magnetic element within radius and pull toward its center
            let targetX = mx, targetY = my
            let isMagnetic = false
            const els = document.querySelectorAll<HTMLElement>('[data-magnetic]')
            let closest: {cx: number; cy: number; dist: number} | null = null
            els.forEach(el => {
                const r = el.getBoundingClientRect()
                const ccx = r.left + r.width / 2
                const ccy = r.top + r.height / 2
                const dist = Math.hypot(mx - ccx, my - ccy)
                if (dist < MAGNET_RADIUS && (!closest || dist < closest.dist)) {
                    closest = {cx: ccx, cy: ccy, dist}
                }
            })
            if (closest) {
                const c = closest as {cx: number; cy: number; dist: number}
                targetX = mx + (c.cx - mx) * MAGNET_STRENGTH
                targetY = my + (c.cy - my) * MAGNET_STRENGTH
                isMagnetic = true
            }

            cx += (targetX - cx) * 0.18
            cy += (targetY - cy) * 0.18
            cursor.style.left = cx + 'px'
            cursor.style.top = cy + 'px'
            const baseSize = isMagnetic ? 44 : 24
            cursor.style.width = baseSize + 'px'
            cursor.style.height = baseSize + 'px'
            cursor.style.opacity = isMagnetic ? '0.9' : '1'

            // Check if over light section
            const el = document.elementFromPoint(mx, my)
            const isLight = el?.closest('[data-nav-theme="light"]') !== null
            const color = isLight ? '0,0,0' : '255,255,255'
            cursor.style.borderColor = `rgba(${color},0.4)`

            // Shift trail (each dot lags behind the previous one)
            for (let i = trail.length - 1; i >= 0; i--) {
                const target = i === 0 ? {x: cx, y: cy} : trail[i - 1]
                trail[i].x += (target.x - trail[i].x) * 0.25
                trail[i].y += (target.y - trail[i].y) * 0.25
                const node = trailRefs.current[i]
                if (node) {
                    node.style.left = trail[i].x + 'px'
                    node.style.top = trail[i].y + 'px'
                    node.style.backgroundColor = `rgba(${color},${0.18 * (1 - i / trail.length)})`
                }
            }

            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            document.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            {/* Trail dots, rendered behind the main cursor */}
            {Array.from({length: TRAIL_LENGTH}).map((_, i) => (
                <div
                    key={i}
                    ref={el => { trailRefs.current[i] = el }}
                    className="fixed pointer-events-none z-[9998] rounded-full"
                    style={{
                        width: `${10 - i}px`,
                        height: `${10 - i}px`,
                        transform: 'translate(-50%, -50%)',
                        top: '-100px',
                        left: '-100px',
                        transition: 'background-color 0.3s',
                    }}
                />
            ))}
            <div
                ref={ref}
                className="fixed pointer-events-none z-[9999] rounded-full border-2 border-white/40"
                style={{
                    width: '24px',
                    height: '24px',
                    transform: 'translate(-50%, -50%)',
                    top: '-100px',
                    left: '-100px',
                    transition: 'width 0.2s, height 0.2s, border-color 0.3s, opacity 0.2s',
                }}
            />
        </>
    )
}
