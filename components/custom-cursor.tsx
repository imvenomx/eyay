'use client'
import {useEffect, useRef} from 'react'

const TRAIL_LENGTH = 4
const MAGNET_RADIUS = 90 // px — distance at which cursor snaps toward a magnetic element
const MAGNET_STRENGTH = 0.4 // 0..1 — how strongly the cursor pulls toward the element center
const COLOR_THROTTLE_MS = 120 // re-check light/dark section at most this often (was every frame)
const MAGNETIC_THROTTLE_MS = 80 // re-scan [data-magnetic] elements at most this often

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

        // Cached state (so we don't recompute every frame)
        let cachedColor = '255,255,255'
        let lastColorCheckAt = 0
        let cachedMagnets: HTMLElement[] = []
        let lastMagnetScanAt = 0

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
        document.addEventListener('mousemove', onMove, {passive: true})

        let rafId: number
        const raf = () => {
            const now = performance.now()

            // Rescan magnetic elements at most every MAGNETIC_THROTTLE_MS
            if (now - lastMagnetScanAt > MAGNETIC_THROTTLE_MS) {
                cachedMagnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
                lastMagnetScanAt = now
            }

            // Pull toward nearest magnetic element within radius
            let targetX = mx, targetY = my
            let isMagnetic = false
            let closestDist = Infinity
            let closestCx = 0, closestCy = 0
            for (const el of cachedMagnets) {
                const r = el.getBoundingClientRect()
                const ccx = r.left + r.width / 2
                const ccy = r.top + r.height / 2
                const dist = Math.hypot(mx - ccx, my - ccy)
                if (dist < MAGNET_RADIUS && dist < closestDist) {
                    closestDist = dist; closestCx = ccx; closestCy = ccy
                }
            }
            if (closestDist < MAGNET_RADIUS) {
                targetX = mx + (closestCx - mx) * MAGNET_STRENGTH
                targetY = my + (closestCy - my) * MAGNET_STRENGTH
                isMagnetic = true
            }

            cx += (targetX - cx) * 0.18
            cy += (targetY - cy) * 0.18
            cursor.style.transform = `translate3d(${cx - 12}px, ${cy - 12}px, 0)`
            const baseSize = isMagnetic ? 44 : 24
            cursor.style.width = baseSize + 'px'
            cursor.style.height = baseSize + 'px'
            cursor.style.opacity = isMagnetic ? '0.9' : '1'

            // Throttled light/dark detection — elementFromPoint is expensive and triggers paints
            if (now - lastColorCheckAt > COLOR_THROTTLE_MS) {
                const el = document.elementFromPoint(mx, my)
                const isLight = !!el?.closest('[data-nav-theme="light"]')
                const next = isLight ? '0,0,0' : '255,255,255'
                if (next !== cachedColor) {
                    cachedColor = next
                    cursor.style.borderColor = `rgba(${cachedColor},0.4)`
                    // Update trail color only when the cached value actually changes
                    for (let i = 0; i < trail.length; i++) {
                        const node = trailRefs.current[i]
                        if (node) node.style.backgroundColor = `rgba(${cachedColor},${0.16 * (1 - i / TRAIL_LENGTH)})`
                    }
                }
                lastColorCheckAt = now
            }

            // Trail dots — pure transform updates, no per-frame style.backgroundColor writes
            for (let i = trail.length - 1; i >= 0; i--) {
                const target = i === 0 ? {x: cx, y: cy} : trail[i - 1]
                trail[i].x += (target.x - trail[i].x) * 0.3
                trail[i].y += (target.y - trail[i].y) * 0.3
                const node = trailRefs.current[i]
                if (node) {
                    const size = 8 - i
                    node.style.transform = `translate3d(${trail[i].x - size / 2}px, ${trail[i].y - size / 2}px, 0)`
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
            {/* Trail dots — color via CSS var keeps the per-frame style writes cheap */}
            {Array.from({length: TRAIL_LENGTH}).map((_, i) => (
                <div
                    key={i}
                    ref={el => { trailRefs.current[i] = el }}
                    className="fixed pointer-events-none z-[9998] rounded-full"
                    style={{
                        width: `${8 - i}px`,
                        height: `${8 - i}px`,
                        top: 0,
                        left: 0,
                        willChange: 'transform',
                        backgroundColor: `rgba(255,255,255,${0.16 * (1 - i / TRAIL_LENGTH)})`,
                    }}
                />
            ))}
            <div
                ref={ref}
                className="fixed pointer-events-none z-[9999] rounded-full border-2 border-white/40"
                style={{
                    width: '24px',
                    height: '24px',
                    top: 0,
                    left: 0,
                    willChange: 'transform, width, height',
                    transition: 'width 0.2s, height 0.2s, border-color 0.3s, opacity 0.2s',
                }}
            />
        </>
    )
}
