'use client'
import {useState, useEffect, useCallback} from 'react'

interface BinaryHoverProps {
    children: string
    className?: string
    as?: React.ElementType
    [key: string]: any
}

export default function BinaryHover({
                                        children,
                                        className = '',
                                        as: Tag = 'span',
                                        ...props
                                    }: BinaryHoverProps) {
    const [display, setDisplay] = useState(children)
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        setDisplay(children)
    }, [children])

    useEffect(() => {
        if (!hovering) {
            setDisplay(children)
            return
        }

        let frame = 0
        const totalFrames = 10
        const interval = setInterval(() => {
            frame++
            if (frame >= totalFrames) {
                clearInterval(interval)
                setDisplay(children)
                return
            }
            // Progressively reveal original characters left-to-right
            const revealCount = Math.floor((frame / totalFrames) * children.length)
            setDisplay(
                children
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' '
                        if (i < revealCount) return children[i]
                        return Math.random() > 0.5 ? '1' : '0'
                    })
                    .join(''),
            )
        }, 50)

        return () => clearInterval(interval)
    }, [hovering, children])

    const enter = useCallback(() => setHovering(true), [])
    const leave = useCallback(() => setHovering(false), [])

    return (
        <Tag
            className={`font-mono transition-none ${className}`}
            onMouseEnter={enter}
            onMouseLeave={leave}
            {...props}
        >
            {display}
        </Tag>
    )
}
