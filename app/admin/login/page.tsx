import {redirect} from 'next/navigation'
import {hasValidSession, isAdminConfigured} from '@/lib/admin-auth'
import LoginForm from './login-form'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Admin Login',
    robots: {index: false, follow: false},
}

export default async function AdminLoginPage() {
    if (await hasValidSession()) {
        redirect('/admin')
    }
    const configured = isAdminConfigured()
    return <LoginForm configured={configured}/>
}
