'use client'
import React, {useState} from 'react'
import {useLanguage} from '@/lib/language-context'

export default function ContactPage() {
    const {t} = useLanguage()
    const [form, setForm] = useState({name: '', email: '', company: '', message: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <main className="bg-white text-black min-h-screen" data-nav-theme="light">
            <div className="w-full border-l border-r border-black/10 px-8 md:px-16 lg:px-20 pt-28 pb-20 md:pt-36 md:pb-28">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/40 mb-8">{t('contact.label')}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Left — heading + info */}
                    <div>
                        <span className="inline-block w-2 h-2 rounded-full bg-black mr-3 relative -top-0.5"/>
                        <h1 className="text-3xl md:text-5xl leading-[1.1] inline font-vcr" style={{fontWeight: 900}}>
                            {t('contact.heading')}
                        </h1>
                        <p className="text-sm text-black/55 leading-relaxed mt-8 mb-12">{t('contact.desc')}</p>

                        <div className="space-y-6 border-t border-black/10 pt-8">
                            <h3 className="text-lg font-vcr">{t('contact.info')}</h3>
                            <div className="space-y-3 text-sm text-black/50">
                                <p>hello@eeyaay.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right — form */}
                    <div>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                    {t('contact.name')}
                                </label>
                                <input
                                    name="name" value={form.name} onChange={handleChange}
                                    className="w-full border-b border-black/15 bg-transparent py-3 text-sm focus:outline-none focus:border-black/40 transition-colors font-mono"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                    {t('contact.email')}
                                </label>
                                <input
                                    name="email" type="email" value={form.email} onChange={handleChange}
                                    className="w-full border-b border-black/15 bg-transparent py-3 text-sm focus:outline-none focus:border-black/40 transition-colors font-mono"
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                    {t('contact.company')}
                                </label>
                                <input
                                    name="company" value={form.company} onChange={handleChange}
                                    className="w-full border-b border-black/15 bg-transparent py-3 text-sm focus:outline-none focus:border-black/40 transition-colors font-mono"
                                    placeholder="Company name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                    {t('contact.message')}
                                </label>
                                <textarea
                                    name="message" value={form.message} onChange={handleChange} rows={5}
                                    className="w-full border-b border-black/15 bg-transparent py-3 text-sm focus:outline-none focus:border-black/40 transition-colors font-mono resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-black text-white text-xs tracking-wider hover:bg-black/80 transition-all duration-300 font-vcr mt-4">
                                {t('contact.send')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
