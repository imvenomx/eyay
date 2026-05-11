'use client'
import React, {useState} from 'react'
import {useLanguage} from '@/lib/language-context'

type FieldErrors = Partial<Record<'name' | 'email' | 'company' | 'message', string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage() {
    const {t} = useLanguage()
    const [form, setForm] = useState({name: '', email: '', company: '', message: ''})
    const [errors, setErrors] = useState<FieldErrors>({})
    const [status, setStatus] = useState<Status>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setForm(prev => ({...prev, [name]: value}))
        if (errors[name as keyof FieldErrors]) {
            setErrors(prev => ({...prev, [name]: undefined}))
        }
    }

    const validate = (): FieldErrors => {
        const next: FieldErrors = {}
        if (form.name.trim().length < 2) next.name = t('contact.error.name')
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t('contact.error.email')
        if (form.message.trim().length < 10) next.message = t('contact.error.message')
        return next
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const localErrors = validate()
        if (Object.keys(localErrors).length > 0) {
            setErrors(localErrors)
            return
        }
        setStatus('submitting')
        setErrors({})
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                if (data.fieldErrors) setErrors(data.fieldErrors)
                setStatus('error')
                return
            }
            setStatus('success')
            setForm({name: '', email: '', company: '', message: ''})
        } catch {
            setStatus('error')
        }
    }

    const fieldClass = (hasError: boolean) =>
        `w-full border-b bg-transparent py-3 text-sm focus:outline-none transition-colors font-mono ${
            hasError ? 'border-red-500/60 focus:border-red-500' : 'border-black/15 focus:border-black/40'
        }`

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
                        {status === 'success' ? (
                            <div className="relative border border-black/10 p-8 md:p-10">
                                <span className="absolute top-0 left-0 w-3 h-px bg-black/40"/>
                                <span className="absolute top-0 left-0 w-px h-3 bg-black/40"/>
                                <span className="absolute top-0 right-0 w-3 h-px bg-black/40"/>
                                <span className="absolute top-0 right-0 w-px h-3 bg-black/40"/>
                                <span className="absolute bottom-0 left-0 w-3 h-px bg-black/40"/>
                                <span className="absolute bottom-0 left-0 w-px h-3 bg-black/40"/>
                                <span className="absolute bottom-0 right-0 w-3 h-px bg-black/40"/>
                                <span className="absolute bottom-0 right-0 w-px h-3 bg-black/40"/>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"/>
                                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50">
                                        {t('contact.success.title')}
                                    </p>
                                </div>
                                <p className="text-2xl md:text-3xl font-vcr leading-tight">
                                    {t('contact.success.desc')}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-black/20 text-xs tracking-wider hover:bg-black hover:text-white transition-all duration-300 font-vcr">
                                    {t('contact.send')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                <div>
                                    <label htmlFor="contact-name" className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                        {t('contact.name')}
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name" value={form.name} onChange={handleChange}
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                        className={fieldClass(!!errors.name)}
                                        placeholder={t('contact.placeholder.name')}
                                    />
                                    {errors.name && (
                                        <p id="contact-name-error" className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                        {t('contact.email')}
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email" type="email" value={form.email} onChange={handleChange}
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                        className={fieldClass(!!errors.email)}
                                        placeholder={t('contact.placeholder.email')}
                                    />
                                    {errors.email && (
                                        <p id="contact-email-error" className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="contact-company" className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                        {t('contact.company')}
                                    </label>
                                    <input
                                        id="contact-company"
                                        name="company" value={form.company} onChange={handleChange}
                                        className={fieldClass(false)}
                                        placeholder={t('contact.placeholder.company')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-mono text-black/50 uppercase tracking-wider mb-2">
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message" value={form.message} onChange={handleChange} rows={5}
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                        className={`${fieldClass(!!errors.message)} resize-none`}
                                        placeholder={t('contact.placeholder.message')}
                                    />
                                    {errors.message && (
                                        <p id="contact-message-error" className="mt-2 text-[10px] font-mono uppercase tracking-wider text-red-600">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                                {status === 'error' && (
                                    <p className="text-[10px] font-mono uppercase tracking-wider text-red-600">
                                        {t('contact.error.generic')}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    data-magnetic
                                    disabled={status === 'submitting'}
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-black text-white text-xs tracking-wider hover:bg-black/80 transition-all duration-300 font-vcr mt-4 disabled:opacity-50">
                                    {status === 'submitting' ? t('contact.sending') : t('contact.send')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
