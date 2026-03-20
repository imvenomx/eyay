'use client'
import {useEffect} from 'react'

/**
 * Suppresses the "removeChild" error caused by React Three Fiber
 * creating DOM nodes that React can't track during unmount/navigation.
 * This is a known issue with R3F + Next.js App Router.
 */
export default function ErrorSuppressor() {
    useEffect(() => {
        const handler = (e: ErrorEvent) => {
            if (e.message?.includes('removeChild') || e.message?.includes('NotFoundError')) {
                e.preventDefault()
                e.stopPropagation()
                return true
            }
        }

        const unhandledHandler = (e: PromiseRejectionEvent) => {
            const msg = e.reason?.message || String(e.reason)
            if (msg.includes('removeChild') || msg.includes('NotFoundError') || msg.includes('Context Lost')) {
                e.preventDefault()
            }
        }

        window.addEventListener('error', handler, true)
        window.addEventListener('unhandledrejection', unhandledHandler, true)

        return () => {
            window.removeEventListener('error', handler, true)
            window.removeEventListener('unhandledrejection', unhandledHandler, true)
        }
    }, [])

    return null
}
