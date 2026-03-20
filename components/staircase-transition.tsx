'use client'
import React, {useRef, useEffect} from 'react'

const COLUMN_COUNT = 4

interface StaircaseTransitionProps {
    variant?: 'to-dark' | 'to-light'
}

export default function StaircaseTransition({variant = 'to-dark'}: StaircaseTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const bgColor = variant === 'to-dark' ? 'bg-black' : 'bg-white'
    const colColor = variant === 'to-dark' ? 'bg-white' : 'bg-black'

    useEffect(() => {
        if (typeof window === 'undefined') return
        let trigger: any

        const setup = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            if (!containerRef.current) return

            const cols = containerRef.current.querySelectorAll('.stair-col')

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    end: 'bottom 50%',
                    scrub: 0.3,
                },
            })

            tl.to(cols, {
                scaleY: 0,
                duration: 1,
                stagger: {each: 0.12, from: 'end'},
                ease: 'power2.inOut',
            })

            trigger = tl.scrollTrigger
        }

        setup()
        return () => { trigger?.kill?.() }
    }, [])

    return (
        <div ref={containerRef} className={`h-[200px] ${bgColor} relative overflow-hidden`}>
            <div className="absolute inset-0 flex">
                {Array.from({length: COLUMN_COUNT}).map((_, i) => (
                    <div key={i} className={`stair-col flex-1 ${colColor} origin-top will-change-transform`}/>
                ))}
            </div>
        </div>
    )
}
