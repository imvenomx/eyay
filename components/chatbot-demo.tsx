'use client'
import React, {useEffect, useRef, useState} from 'react'

interface ScriptedMessage {
    role: 'user' | 'ai'
    text: string
    chips?: string[] // user reply options that appear after this AI message
}

const SCRIPT: ScriptedMessage[] = [
    {role: 'ai', text: 'Ciao! Sono l\u2019assistente AI di Eey Aay. Su cosa posso aiutarti oggi?', chips: ['Voglio un chatbot', 'Costi e tempi', 'Esempi concreti']},
    {role: 'user', text: 'Voglio un chatbot per il mio sito.'},
    {role: 'ai', text: 'Ottimo. Per capire meglio, qualche domanda veloce — di che settore è la tua azienda?', chips: ['SaaS B2B', 'E-commerce', 'Servizi professionali']},
    {role: 'user', text: 'SaaS B2B.'},
    {role: 'ai', text: 'Perfetto. Volume medio di richieste al mese?', chips: ['< 500', '500-2000', '> 2000']},
    {role: 'user', text: '500-2000.'},
    {role: 'ai', text: 'Ti consiglio il pacchetto Pro con qualificazione lead + integrazione CRM. Prenotiamo una call?', chips: ['Sì, prenota', 'Mandami info via email']},
    {role: 'user', text: 'Sì, prenota.'},
    {role: 'ai', text: 'Fatto. Ti ho mandato il link per scegliere lo slot via email. Un nostro consulente ti contatterà entro 24 ore. ✓'},
]

const TYPING_MIN_MS = 700
const TYPING_MAX_MS = 1400
const USER_REPLY_MS = 1200

interface DisplayMessage {
    role: 'user' | 'ai'
    text: string
}

export default function ChatbotDemo() {
    const [messages, setMessages] = useState<DisplayMessage[]>([])
    const [typing, setTyping] = useState(false)
    const [done, setDone] = useState(false)
    const [activeChips, setActiveChips] = useState<string[] | null>(null)
    const [progress, setProgress] = useState(0) // index into SCRIPT
    const containerRef = useRef<HTMLDivElement>(null)
    const startedRef = useRef(false)

    // Auto-scroll on new messages
    useEffect(() => {
        const c = containerRef.current
        if (c) c.scrollTop = c.scrollHeight
    }, [messages, typing])

    // Start when the demo scrolls into view
    useEffect(() => {
        if (startedRef.current) return
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting && !startedRef.current) {
                    startedRef.current = true
                    runScript()
                    observer.disconnect()
                    return
                }
            }
        }, {threshold: 0.3})

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const runScript = async () => {
        for (let i = 0; i < SCRIPT.length; i++) {
            const step = SCRIPT[i]
            setProgress(i)
            if (step.role === 'ai') {
                setTyping(true)
                await sleep(rand(TYPING_MIN_MS, TYPING_MAX_MS))
                setTyping(false)
                setMessages(m => [...m, {role: 'ai', text: step.text}])
                if (step.chips) {
                    setActiveChips(step.chips)
                    await sleep(800)
                }
            } else {
                setActiveChips(null)
                await sleep(USER_REPLY_MS)
                setMessages(m => [...m, {role: 'user', text: step.text}])
            }
        }
        setActiveChips(null)
        setDone(true)
    }

    const restart = () => {
        setMessages([])
        setTyping(false)
        setDone(false)
        setActiveChips(null)
        setProgress(0)
        startedRef.current = true
        runScript()
    }

    return (
        <div className="relative border border-black/15 bg-[#0a0a0a] text-white">
            {/* Crosshair corners */}
            <span className="absolute top-0 left-0 w-4 h-px bg-white/40"/>
            <span className="absolute top-0 left-0 w-px h-4 bg-white/40"/>
            <span className="absolute top-0 right-0 w-4 h-px bg-white/40"/>
            <span className="absolute top-0 right-0 w-px h-4 bg-white/40"/>
            <span className="absolute bottom-0 left-0 w-4 h-px bg-white/40"/>
            <span className="absolute bottom-0 left-0 w-px h-4 bg-white/40"/>
            <span className="absolute bottom-0 right-0 w-4 h-px bg-white/40"/>
            <span className="absolute bottom-0 right-0 w-px h-4 bg-white/40"/>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                    <span className="font-vcr text-xs uppercase tracking-wider text-white/60">Demo interattiva</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
                    {done ? 'Completata' : `${progress + 1} / ${SCRIPT.length}`}
                </span>
            </div>

            {/* Messages */}
            <div ref={containerRef} className="h-[420px] overflow-y-auto px-5 py-5 space-y-3 scrollbar-hide">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                        <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                            msg.role === 'user'
                                ? 'bg-white/10 text-white/80 rounded-tl-lg rounded-bl-lg rounded-tr-sm'
                                : 'bg-white/[0.04] text-white/70 border border-white/[0.06] rounded-tr-lg rounded-br-lg rounded-tl-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {typing && (
                    <div className="flex justify-start">
                        <div className="bg-white/[0.04] border border-white/[0.06] rounded-tr-lg rounded-br-lg rounded-tl-sm px-4 py-3">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{animationDelay: '0ms'}}/>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{animationDelay: '150ms'}}/>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{animationDelay: '300ms'}}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer: chips or restart */}
            <div className="px-5 py-4 border-t border-white/10 min-h-[60px] flex items-center">
                {activeChips ? (
                    <div className="flex flex-wrap gap-2">
                        {activeChips.map((chip, i) => (
                            <span key={i}
                                  className="px-3 py-1.5 border border-white/15 text-[11px] font-mono uppercase tracking-wider text-white/60 cursor-default">
                                {chip}
                            </span>
                        ))}
                    </div>
                ) : done ? (
                    <button onClick={restart}
                            className="text-[11px] font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors">
                        ↻ Riavvia demo
                    </button>
                ) : (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/20">
                        // Simulazione in corso
                    </span>
                )}
            </div>
        </div>
    )
}

function sleep(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
}
function rand(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min))
}
