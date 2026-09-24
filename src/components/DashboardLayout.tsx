import type { ReactNode } from 'react'
import { HelpCircle, Search } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './AppSidebar'
import UserMenu from './UserMenu'
import OnboardingModal from './OnboardingModal'
import { useOnboarding } from '../hooks/useOnboarding'
import type { Jugador } from '../types/auth.types'

function obtenerJugador(): Jugador | null {
    try {
        const jugador = JSON.parse(localStorage.getItem('jugador') ?? 'null') as Partial<Jugador> | null
        return jugador && typeof jugador.nombre === 'string' ? jugador as Jugador : null
    } catch {
        return null
    }
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const jugador = obtenerJugador()
    const nombre = jugador?.nombre?.trim() || 'Usuario'
    const iniciales = nombre === 'Usuario'
        ? '--'
        : nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((parte) => parte[0]).join('').toUpperCase() || '--'
    const { abierto: onboardingAbierto, abrir: abrirOnboarding, cerrar: cerrarOnboarding } = useOnboarding()

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen flex-1 bg-slate-950">
                <header className="flex h-16 items-center gap-4 border-b border-slate-800/80 bg-slate-950/90 px-6">
                    <SidebarTrigger className="text-slate-300" />
                    <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-500 sm:flex sm:max-w-md"><Search className="size-4" /><span>Buscar correos, usuarios, dispositivos...</span></div>
                    <div className="ml-auto flex items-center gap-4 text-xs text-slate-400">
                        <button
                            onClick={abrirOnboarding}
                            className="flex size-8 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-teal-400/40 hover:text-teal-300"
                            aria-label="Ver guía"
                            title="Ver guía"
                        >
                            <HelpCircle className="size-4" />
                        </button>
                        <UserMenu nombre={nombre} email={jugador?.email} iniciales={iniciales} />
                    </div>
                </header>
                {children}
            </main>
            {onboardingAbierto && <OnboardingModal onCerrar={cerrarOnboarding} />}
        </SidebarProvider>
    )
}