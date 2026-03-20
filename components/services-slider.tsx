'use client'
import React, {useRef, useEffect} from 'react'
import Link from 'next/link'
import BinaryHover from '@/components/binary-hover'

const industries = [
    {id: '01', title: 'Sanità', body: 'Coinvolgimento pazienti con AI, prenotazione appuntamenti, sistemi RAG medici, automazione dei flussi clinici e chatbot conformi alle normative sanitarie.'},
    {id: '02', title: 'Viaggi & Ospitalità', body: 'Assistenti di prenotazione intelligenti, concierge vocali, raccomandazioni personalizzate, automazione dei prezzi dinamici e AI per l\'esperienza ospite.'},
    {id: '03', title: 'Finanza & Banche', body: 'Modelli di rilevamento frodi, controlli di conformità automatizzati, consulenti finanziari AI, automazione prestiti e valutazione intelligente del rischio.'},
    {id: '04', title: 'Retail & E-commerce', body: 'Motori di raccomandazione prodotti, previsione inventario, assistenti allo shopping conversazionali, supporto clienti automatizzato e prezzi dinamici.'},
    {id: '05', title: 'Immobiliare', body: 'Qualificazione lead automatizzata, assistenti immobiliari virtuali, automazione CRM, analisi di mercato AI e elaborazione intelligente documenti.'},
    {id: '06', title: 'Legale & Compliance', body: 'Analisi contratti con AI, monitoraggio conformità normativa, sistemi RAG legali, due diligence automatizzata e gestione casi.'},
    {id: '07', title: 'Istruzione', body: 'Sistemi di tutoraggio AI, valutazione automatizzata, percorsi di apprendimento personalizzati, automazione amministrativa e chatbot per studenti.'},
    {id: '08', title: 'Logistica', body: 'Ottimizzazione percorsi AI, previsione domanda, automazione magazzino, bot di tracciamento spedizioni e dashboard visibilità supply chain.'},
    {id: '09', title: 'Manifattura', body: 'Modelli di manutenzione predittiva, controllo qualità AI, ottimizzazione pianificazione produzione, analisi dati IoT e sistemi digital twin.'},
    {id: '10', title: 'Media', body: 'Raccomandazione contenuti AI, moderazione automatizzata, analisi audience, ottimizzazione pubblicità programmatica e generazione asset creativi.'},
]

const chamfer = 'polygon(0% 0%, calc(100% - 28px) 0%, 100% 28px, 100% 100%, 28px 100%, 0% calc(100% - 28px))'
const chamferBtn = 'polygon(0% 0%, calc(100% - 14px) 0%, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px))'

function Barcode() {
    return (
        <div className="flex gap-[3px] items-end">
            {[18, 28, 14, 22, 30, 16].map((h, i) => (
                <div key={i} className="w-[2px] bg-white/15" style={{height: h}}/>
            ))}
        </div>
    )
}

export default function ServicesSlider() {
    const sectionRef = useRef<HTMLElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<any>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const setup = async () => {
            const gsap = (await import('gsap')).default
            const {ScrollTrigger} = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            if (!sectionRef.current || !sliderRef.current) return

            const slider = sliderRef.current
            // Wait for layout to settle
            await new Promise(r => setTimeout(r, 100))
            const maxScroll = slider.scrollWidth - slider.clientWidth

            if (maxScroll <= 0) return

            triggerRef.current = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${maxScroll}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const target = self.progress * maxScroll
                    slider.scrollLeft = target
                },
            })
        }

        setup()
        return () => { triggerRef.current?.kill?.() }
    }, [])

    return (
        <section ref={sectionRef} className="relative h-screen overflow-hidden">
            {/* Graph paper background */}
            <div className="absolute inset-0 opacity-[0.04]"
                 style={{
                     backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                     backgroundSize: '40px 40px',
                 }}/>

            <div className="relative h-full flex flex-col lg:flex-row">
                {/* Left column */}
                <div className="lg:w-[35%] shrink-0 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">Industrie</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight mb-6 font-vcr-mono">
                        TROVA LA TUA<br/>INDUSTRIA
                    </h2>
                    <div className="w-16 h-px bg-white/20 mb-6"/>
                    <p className="text-sm text-white/40 font-mono leading-relaxed mb-10 max-w-xs">
                        Soluzioni AI e automazione su misura per ogni settore.
                    </p>
                    <Link
                        href="#contact"
                        className="inline-block w-fit px-6 py-3 border border-white/20 text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 font-vcr"
                        style={{clipPath: chamferBtn}}>
                        <BinaryHover>INIZIA ORA</BinaryHover>
                    </Link>
                </div>

                {/* Right column — horizontal slider */}
                <div className="lg:w-[65%] flex items-center overflow-hidden">
                    <div
                        ref={sliderRef}
                        className="flex gap-5 px-4 lg:px-0 scrollbar-hide overflow-x-auto"
                    >
                        {industries.map((ind) => (
                            <div key={ind.id} className="shrink-0 w-[300px] md:w-[370px]">
                                <div
                                    className="h-[400px] md:h-[460px] bg-black/80 backdrop-blur-sm border border-white/5 p-8 md:p-10 flex flex-col hover:border-white/10 transition-colors duration-300"
                                    style={{clipPath: chamfer}}>
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/20">
                                        INDUSTRY ———— {ind.id}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold mt-auto mb-5 leading-tight tracking-tight font-vcr">
                                        {ind.title}
                                    </h3>
                                    <p className="text-xs text-white/30 font-mono leading-relaxed mb-8">
                                        {ind.body}
                                    </p>
                                    <div className="self-end mt-auto">
                                        <Barcode/>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="shrink-0 w-8"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
