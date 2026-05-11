'use client'
import {useEffect} from 'react'

/**
 * Swaps the document favicon to /favicon-active.svg when the chat modal is open.
 * Other components can fire `window.dispatchEvent(new CustomEvent('eyay:chat', {detail: {open: true}}))`
 * to signal state. We also listen for body class `no-scroll` as a fallback signal
 * the chat-modal already sets when open.
 */
export default function FaviconController() {
    useEffect(() => {
        if (typeof document === 'undefined') return
        const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'))
        if (links.length === 0) return

        const defaultHref = '/favicon.svg'
        const activeHref = '/favicon-active.svg'
        let isActive = false

        const setActive = (next: boolean) => {
            if (next === isActive) return
            isActive = next
            for (const link of links) {
                link.href = next ? activeHref : defaultHref
            }
        }

        const onChatEvent = (e: Event) => {
            const ce = e as CustomEvent<{open?: boolean}>
            if (ce.detail) setActive(!!ce.detail.open)
        }

        // Heuristic: chat-modal locks scroll via html.no-scroll when open.
        const observer = new MutationObserver(() => {
            setActive(document.documentElement.classList.contains('no-scroll'))
        })
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']})

        window.addEventListener('eyay:chat', onChatEvent)
        return () => {
            observer.disconnect()
            window.removeEventListener('eyay:chat', onChatEvent)
            setActive(false)
        }
    }, [])

    return null
}
