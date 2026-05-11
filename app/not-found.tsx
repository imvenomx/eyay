import Link from 'next/link'
import BinaryHover from '@/components/binary-hover'
import ScrambleOnView from '@/components/scramble-on-view'

export const metadata = {
    title: '404 — Eey Aay',
    description: 'La pagina che cercavi non esiste.',
    robots: {index: false, follow: false},
}

export default function NotFound() {
    return (
        <main className="bg-black text-white min-h-[100svh] flex items-center justify-center px-6">
            <div className="relative max-w-3xl w-full border border-white/10 bg-[#0a0a0a] p-8 md:p-12">
                {/* Crosshair corners */}
                <span className="absolute top-0 left-0 w-4 h-px bg-white/40"/>
                <span className="absolute top-0 left-0 w-px h-4 bg-white/40"/>
                <span className="absolute top-0 right-0 w-4 h-px bg-white/40"/>
                <span className="absolute top-0 right-0 w-px h-4 bg-white/40"/>
                <span className="absolute bottom-0 left-0 w-4 h-px bg-white/40"/>
                <span className="absolute bottom-0 left-0 w-px h-4 bg-white/40"/>
                <span className="absolute bottom-0 right-0 w-4 h-px bg-white/40"/>
                <span className="absolute bottom-0 right-0 w-px h-4 bg-white/40"/>

                <div className="flex items-center gap-2 mb-8">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-400/80">
                        STATUS // 404 — NOT FOUND
                    </span>
                </div>

                <h1 className="font-vcr text-7xl md:text-9xl leading-none mb-6" style={{fontWeight: 900}}>
                    <ScrambleOnView>404</ScrambleOnView>
                </h1>

                <p className="text-2xl md:text-3xl font-vcr mb-4">
                    Questa pagina non esiste.
                </p>
                <p className="text-sm font-mono text-white/55 leading-relaxed mb-10 max-w-xl">
                    Forse il link era sbagliato, forse l’abbiamo spostata, forse stiamo ancora costruendo.
                    In ogni caso, qui sotto trovi qualche posto dove andare.
                </p>

                <div className="flex flex-wrap gap-3">
                    <Link href="/" data-magnetic
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-vcr text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors">
                        <BinaryHover>Home</BinaryHover>
                        <span>→</span>
                    </Link>
                    <Link href="/blog"
                          className="inline-flex items-center px-5 py-2.5 border border-white/15 hover:border-white/40 font-vcr text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors">
                        Blog
                    </Link>
                    <Link href="/case-studies"
                          className="inline-flex items-center px-5 py-2.5 border border-white/15 hover:border-white/40 font-vcr text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors">
                        Case Studies
                    </Link>
                    <Link href="/contact"
                          className="inline-flex items-center px-5 py-2.5 border border-white/15 hover:border-white/40 font-vcr text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors">
                        Contatti
                    </Link>
                </div>
            </div>
        </main>
    )
}
