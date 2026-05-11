'use client'
import React from 'react'

interface Props {
    children: React.ReactNode
    fallback?: React.ReactNode
    /** Optional label so different boundaries log distinctly. */
    label?: string
}

interface State {
    hasError: boolean
}

export default class ErrorBoundary extends React.Component<Props, State> {
    state: State = {hasError: false}

    static getDerivedStateFromError(): State {
        return {hasError: true}
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // eslint-disable-next-line no-console
        console.warn(`[ErrorBoundary${this.props.label ? `:${this.props.label}` : ''}]`, error, info.componentStack)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <DefaultFallback/>
        }
        return this.props.children
    }
}

function DefaultFallback() {
    return (
        <div className="w-full bg-black text-white py-20 px-8 flex items-center justify-center">
            <div className="text-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-3">// Errore di rendering</p>
                <p className="font-vcr text-2xl">Qualcosa non ha funzionato in questa sezione.</p>
                <p className="text-xs font-mono text-white/30 mt-3">
                    Aggiorna la pagina o continua a scorrere — il resto del sito funziona normalmente.
                </p>
            </div>
        </div>
    )
}
