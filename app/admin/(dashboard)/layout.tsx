import {redirect} from 'next/navigation'
import React from 'react'
import {hasValidSession, isAdminConfigured} from '@/lib/admin-auth'
import DashboardShell from './dashboard-shell'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Dashboard',
    robots: {index: false, follow: false},
}

export default async function ProtectedAdminLayout({children}: {children: React.ReactNode}) {
    if (!isAdminConfigured() || !(await hasValidSession())) {
        redirect('/admin/login')
    }
    return <DashboardShell>{children}</DashboardShell>
}
