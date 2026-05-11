'use client'
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'

export default function LoginForm({configured}: {configured: boolean}) {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!configured) return
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password}),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                setError(data.error || 'Login fallito')
                setLoading(false)
                return
            }
            router.replace('/admin')
            router.refresh()
        } catch {
            setError('Errore di rete')
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="relative w-full max-w-md border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
                {/* Crosshair corners */}
                <span className="absolute top-0 left-0 w-4 h-px bg-white/40"/>
                <span className="absolute top-0 left-0 w-px h-4 bg-white/40"/>
                <span className="absolute top-0 right-0 w-4 h-px bg-white/40"/>
                <span className="absolute top-0 right-0 w-px h-4 bg-white/40"/>
                <span className="absolute bottom-0 left-0 w-4 h-px bg-white/40"/>
                <span className="absolute bottom-0 left-0 w-px h-4 bg-white/40"/>
                <span className="absolute bottom-0 right-0 w-4 h-px bg-white/40"/>
                <span className="absolute bottom-0 right-0 w-px h-4 bg-white/40"/>

                <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                        Eey Aay // Admin
                    </span>
                </div>

                <h1 className="text-3xl font-vcr mb-2" style={{fontWeight: 900}}>
                    Accesso Riservato
                </h1>
                <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-8">
                    Inserisci la password per continuare
                </p>

                {!configured ? (
                    <div className="border border-yellow-500/30 bg-yellow-500/5 p-4 text-xs font-mono text-yellow-400/90 leading-relaxed">
                        Variabile <code className="text-yellow-300">ADMIN_PASSWORD</code> non configurata.
                        Aggiungila al tuo <code className="text-yellow-300">.env.local</code> e riavvia il server.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                            <label htmlFor="admin-password" className="block text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 mb-2">
                                Password
                            </label>
                            <input
                                id="admin-password"
                                type="password"
                                autoFocus
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 font-mono disabled:opacity-50"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-[10px] font-mono uppercase tracking-wider text-red-400">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="relative w-full px-6 py-3 cursor-pointer group disabled:opacity-50 border border-white/15 hover:border-white/40 transition-colors">
                            <span className="absolute top-0 left-0 w-3 h-px bg-white/40"/>
                            <span className="absolute top-0 left-0 w-px h-3 bg-white/40"/>
                            <span className="absolute top-0 right-0 w-3 h-px bg-white/40"/>
                            <span className="absolute top-0 right-0 w-px h-3 bg-white/40"/>
                            <span className="absolute bottom-0 left-0 w-3 h-px bg-white/40"/>
                            <span className="absolute bottom-0 left-0 w-px h-3 bg-white/40"/>
                            <span className="absolute bottom-0 right-0 w-3 h-px bg-white/40"/>
                            <span className="absolute bottom-0 right-0 w-px h-3 bg-white/40"/>
                            <span className="font-vcr text-xs uppercase tracking-[0.25em] text-white/80 group-hover:text-white transition-colors">
                                {loading ? 'Verifica…' : 'Entra →'}
                            </span>
                        </button>
                    </form>
                )}
            </div>
        </main>
    )
}
