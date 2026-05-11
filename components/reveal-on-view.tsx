'use client'
import React, {useEffect, useRef, useState} from 'react'

interface RevealOnViewProps {
    children: React.ReactNode
    className?: string
    delay?: number // ms
    direction?: 'up' | 'left' | 'right' | 'none'
    threshold?: number
}

export default function RevealOnView({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    threshold = 0.15,
}: RevealOnViewProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return
        const isReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
        setReduced(isReduced)
        if (isReduced) { setVisible(true); return }

        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                    return
                }
            }
        }, {threshold})
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    const offset = reduced ? '0' : (
        direction === 'up' ? '20px' :
        direction === 'left' ? '-20px' :
        direction === 'right' ? '20px' : '0'
    )
    const transformAxis = direction === 'left' || direction === 'right' ? 'translateX' : 'translateY'
    const hiddenTransform = direction === 'none' ? 'none' : `${transformAxis}(${offset})`

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : hiddenTransform,
                transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${delay}ms`,
                willChange: visible ? 'auto' : 'opacity, transform',
            }}>
            {children}
        </div>
    )
}
