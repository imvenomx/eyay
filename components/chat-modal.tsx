'use client'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import Link from 'next/link'

interface Message {
    role: 'user' | 'ai'
    text: string
}

// Parse markdown links [text](/url) into clickable elements
function renderMessageText(text: string) {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
    return parts.map((part, i) => {
        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
        if (match) {
            return (
                <Link key={i} href={match[2]}
                      className="relative inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 bg-white text-black text-xs font-vcr-mono tracking-wider hover:bg-white/90 transition-colors">
                    {/* Crosshair corners */}
                    <span className="absolute top-0 left-0 w-2.5 h-px bg-black/30"/>
                    <span className="absolute top-0 left-0 w-px h-2.5 bg-black/30"/>
                    <span className="absolute top-0 right-0 w-2.5 h-px bg-black/30"/>
                    <span className="absolute top-0 right-0 w-px h-2.5 bg-black/30"/>
                    <span className="absolute bottom-0 left-0 w-2.5 h-px bg-black/30"/>
                    <span className="absolute bottom-0 left-0 w-px h-2.5 bg-black/30"/>
                    <span className="absolute bottom-0 right-0 w-2.5 h-px bg-black/30"/>
                    <span className="absolute bottom-0 right-0 w-px h-2.5 bg-black/30"/>
                    {match[1]} →
                </Link>
            )
        }
        return <span key={i}>{part}</span>
    })
}

interface ChatModalProps {
    open: boolean
    onClose: () => void
}

export default function ChatModal({open, onClose}: ChatModalProps) {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        {role: 'ai', text: 'Ciao! Come posso aiutarti oggi? Raccontami del tuo progetto e ti consiglierò la soluzione migliore.'}
    ])
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    useEffect(() => {
        if (open) {
            document.documentElement.classList.add('no-scroll')
        } else {
            document.documentElement.classList.remove('no-scroll')
        }
        return () => { document.documentElement.classList.remove('no-scroll') }
    }, [open])

    const handleSend = useCallback(async () => {
        if (!input.trim() || loading) return
        const userMsg = input.trim()
        setInput('')
        setMessages(prev => [...prev, {role: 'user', text: userMsg}])
        setLoading(true)

        try {
            // Build message history for API (last 10 messages max)
            const history = [...messages, {role: 'user' as const, text: userMsg}]
                .slice(-10)
                .map(m => ({role: m.role === 'ai' ? 'assistant' : 'user', content: m.text}))

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({messages: history}),
            })

            const data = await res.json()
            const reply = data.reply || data.error || 'Mi dispiace, si è verificato un errore.'
            setMessages(prev => [...prev, {role: 'ai', text: reply}])
        } catch {
            setMessages(prev => [...prev, {role: 'ai', text: 'Mi dispiace, non riesco a connettermi al server. Riprova più tardi.'}])
        }

        setLoading(false)
    }, [input, loading, messages])

    return (
        <div className={`fixed inset-0 z-[9997] flex items-center justify-center transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>

            <div className={`relative w-full max-w-lg mx-4 h-[70vh] max-h-[600px] bg-[#0a0a0a] border border-white/10 flex flex-col transition-all duration-300 ${open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                {/* Crosshair corners */}
                <div className="absolute top-0 left-0 w-5 h-px bg-white/30"/>
                <div className="absolute top-0 left-0 w-px h-5 bg-white/30"/>
                <div className="absolute top-0 right-0 w-5 h-px bg-white/30"/>
                <div className="absolute top-0 right-0 w-px h-5 bg-white/30"/>
                <div className="absolute bottom-0 left-0 w-5 h-px bg-white/30"/>
                <div className="absolute bottom-0 left-0 w-px h-5 bg-white/30"/>
                <div className="absolute bottom-0 right-0 w-5 h-px bg-white/30"/>
                <div className="absolute bottom-0 right-0 w-px h-5 bg-white/30"/>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                        <span className="font-vcr-mono text-xs text-white/60 uppercase tracking-wider">Eey Aay AI</span>
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                                msg.role === 'user'
                                    ? 'bg-white/10 text-white/80 rounded-tl-lg rounded-bl-lg rounded-tr-sm'
                                    : 'bg-white/5 text-white/60 border border-white/5 rounded-tr-lg rounded-br-lg rounded-tl-sm'
                            }`}>
                                {msg.role === 'ai' ? renderMessageText(msg.text) : msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/5 rounded-tr-lg rounded-br-lg rounded-tl-sm px-4 py-3">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{animationDelay: '0ms'}}/>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{animationDelay: '150ms'}}/>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{animationDelay: '300ms'}}/>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef}/>
                </div>

                {/* Input */}
                <div className="px-5 py-4 border-t border-white/10">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Scrivi un messaggio..."
                            disabled={loading}
                            className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 font-mono disabled:opacity-50"
                        />
                        <button onClick={handleSend} disabled={loading}
                                className="relative px-5 py-3 cursor-pointer group disabled:opacity-50">
                            <div className="absolute top-0 left-0 w-3 h-px bg-white/30"/>
                            <div className="absolute top-0 left-0 w-px h-3 bg-white/30"/>
                            <div className="absolute top-0 right-0 w-3 h-px bg-white/30"/>
                            <div className="absolute top-0 right-0 w-px h-3 bg-white/30"/>
                            <div className="absolute bottom-0 left-0 w-3 h-px bg-white/30"/>
                            <div className="absolute bottom-0 left-0 w-px h-3 bg-white/30"/>
                            <div className="absolute bottom-0 right-0 w-3 h-px bg-white/30"/>
                            <div className="absolute bottom-0 right-0 w-px h-3 bg-white/30"/>
                            <span className="font-vcr-mono text-xs text-white/60 group-hover:text-white uppercase tracking-wider transition-colors">
                                Invia
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
