'use client'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'
import React, {useState} from 'react'
import BinaryHover from '@/components/binary-hover'

const NAV = [
    {label: 'OVERVIEW', href: '/admin'},
    {label: 'CONTATTI', href: '/admin/contacts'},
    {label: 'NEWSLETTER', href: '/admin/newsletter'},
    {label: 'BLOG', href: '/admin/blogs'},
    {label: 'CASE STUDIES', href: '/admin/case-studies'},
]

export default function DashboardShell({children}: {children: React.ReactNode}) {
    const pathname = usePathname() || ''
    const router = useRouter()
    const [loggingOut, setLoggingOut] = useState(false)

    const isActive = (href: string) =>
        href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

    const handleLogout = async () => {
        setLoggingOut(true)
        try {
            await fetch('/api/admin/logout', {method: 'POST'})
            router.replace('/admin/login')
            router.refresh()
        } catch {
            setLoggingOut(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0a] flex md:flex-col">
                <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                        <Image src="/eylogo.png" alt="Eey Aay" width={32} height={32} className="w-8 h-8"/>
                        <span className="font-vcr text-sm tracking-wider">EEY AAY</span>
                    </Link>
                </div>

                <nav className="flex-1 px-3 py-4 flex md:block overflow-x-auto md:overflow-visible">
                    {NAV.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative block px-3 py-2.5 md:my-1 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors whitespace-nowrap ${
                                isActive(item.href)
                                    ? 'text-white bg-white/5 border-l-2 border-white'
                                    : 'text-white/40 hover:text-white border-l-2 border-transparent hover:border-white/30'
                            }`}>
                            <BinaryHover>{item.label}</BinaryHover>
                        </Link>
                    ))}
                </nav>

                <div className="px-6 py-5 border-t border-white/10 hidden md:block">
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="w-full text-left text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors disabled:opacity-50">
                        {loggingOut ? 'Uscita…' : '← Logout'}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">
                <div className="px-6 md:px-10 py-8 md:py-12 max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
