import type { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 bg-slate-950 min-h-screen">
                <SidebarTrigger className="m-4 text-slate-300" />
                {children}
            </main>
        </SidebarProvider>
    )
}