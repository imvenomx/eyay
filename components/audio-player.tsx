'use client'
import {useEffect} from 'react'

export default function AudioPlayer() {
    useEffect(() => {
        if (typeof window === 'undefined') return
        if ((window as any).__eyAudio) return

        const startAudio = () => {
            if ((window as any).__eyAudio) return
            try {
                const audio = new Audio('/ambient.mp3')
                audio.loop = true
                audio.volume = 0.02
                audio.play().catch(() => {})
                ;(window as any).__eyAudio = audio
            } catch {}
            // Remove listeners after first trigger
            document.removeEventListener('click', startAudio)
            document.removeEventListener('scroll', startAudio)
            document.removeEventListener('touchstart', startAudio)
        }

        // Start on any user interaction
        document.addEventListener('click', startAudio, {once: true})
        document.addEventListener('scroll', startAudio, {once: true})
        document.addEventListener('touchstart', startAudio, {once: true})

        return () => {
            document.removeEventListener('click', startAudio)
            document.removeEventListener('scroll', startAudio)
            document.removeEventListener('touchstart', startAudio)
        }
    }, [])

    return null
}
