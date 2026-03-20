'use client'
import {useEffect, useRef} from 'react'

export default function CustomCursor() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = ref.current
        if (!cursor || window.innerWidth <= 768) {
            if (cursor) cursor.style.display = 'none'
            return
        }

        let mx = -100, my = -100, cx = -100, cy = -100

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
        document.addEventListener('mousemove', onMove)

        let rafId: number
        const raf = () => {
            cx += (mx - cx) * 0.15
            cy += (my - cy) * 0.15
            cursor.style.left = cx + 'px'
            cursor.style.top = cy + 'px'

            // Check if over light section
            const el = document.elementFromPoint(mx, my)
            const isLight = el?.closest('[data-nav-theme="light"]') !== null
            cursor.style.borderColor = isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)'

            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            document.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div
            ref={ref}
            className="fixed pointer-events-none z-[9999] rounded-full border-2 border-white/40"
            style={{
                width: '24px',
                height: '24px',
                transform: 'translate(-50%, -50%)',
                top: '-100px',
                left: '-100px',
                transition: 'width 0.2s, height 0.2s, border-color 0.3s',
            }}
        />
    )
}
