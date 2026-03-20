'use client'
import React, {useState, useRef, useEffect} from 'react'

const placeholderMessages = [
    {role: 'user' as const, text: 'Come funzionano i vostri chatbot AI?'},
    {role: 'ai' as const, text: 'I nostri chatbot AI utilizzano modelli di linguaggio avanzati per gestire conversazioni naturali su siti web, WhatsApp e altri canali. Possono qualificare lead, prenotare appuntamenti e fornire supporto 24/7.'},
    {role: 'user' as const, text: 'Quanto tempo serve per implementarlo?'},
    {role: 'ai' as const, text: 'Generalmente tra 2 e 6 settimane, a seconda della complessità delle integrazioni richieste. Iniziamo con un audit del tuo flusso di lavoro attuale.'},
]

interface ChatModalProps {
    open: boolean
    onClose: () => void
}

export default function ChatModal({open, onClose}: ChatModalProps) {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState(placeholderMessages)
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

    const handleSend = () => {
        if (!input.trim()) return
        setMessages(prev => [
            ...prev,
            {role: 'user' as const, text: input},
            {role: 'ai' as const, text: 'Grazie per la tua domanda! Il nostro team ti risponderà a breve con una soluzione personalizzata.'},
        ])
        setInput('')
    }

    return (
        <div className={`fixed inset-0 z-[9997] flex items-center justify-center transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}/>

            {/* Modal */}
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
                                {msg.text}
                            </div>
                        </div>
                    ))}
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
                            className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 font-mono"
                        />
                        <button
                            onClick={handleSend}
                            className="relative px-5 py-3 cursor-pointer group"
                        >
                            {/* Crosshair border on button */}
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
