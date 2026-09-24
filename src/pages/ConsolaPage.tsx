import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { useActividadPendiente } from '../hooks/useActividadPendiente'
import TerminalConsola from '../components/TerminalConsola'
import GlosarioModal from '../components/GlosarioModal'
import { Button } from '../components/ui/button'

const CLAVE_PISTA = 'secureway-pista-consola-vista'
const TEXTO_PISTA = 'sugerencia: probá "ls" para ver qué logs hay.'

function tomarPistaSiCorresponde(): string | undefined {
    try {
        if (localStorage.getItem(CLAVE_PISTA) === '1') return undefined
        localStorage.setItem(CLAVE_PISTA, '1')
        return TEXTO_PISTA
    } catch {
        return undefined
    }
}

export default function ConsolaPage() {
    const { actividad, cargando, error } = useActividadPendiente()
    const [pista] = useState(tomarPistaSiCorresponde)
    const [glosarioAbierto, setGlosarioAbierto] = useState(false)

    return (
        <div className="flex flex-col gap-6 px-8 pb-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Consola</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Investigá el ticket pendiente con comandos reales:{' '}
                        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">ls</code>,{' '}
                        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">cat</code> y{' '}
                        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">grep</code>.
                    </p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 rounded-full" onClick={() => setGlosarioAbierto(true)}>
                    <BookOpen className="size-3.5" /> Guía
                </Button>
            </div>

            {cargando && <p className="text-slate-400">Cargando...</p>}
            {error && (
                <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">{error}</p>
            )}

            {!cargando && !error && !actividad && (
                <p className="rounded-md border border-slate-800 bg-slate-900/70 px-4 py-3 text-slate-400">
                    No hay ningún ticket pendiente para investigar ahora mismo.
                </p>
            )}

            {!cargando && !error && actividad && (
                <>
                    <div className="rounded-md border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                        <p className="font-medium text-slate-100">{actividad.descripcion}</p>
                        <p className="text-xs text-slate-500">Ticket {actividad._id} · turno {actividad.turno}</p>
                    </div>
                    <TerminalConsola logs={actividad.logs} pistaInicial={pista} />
                </>
            )}

            {glosarioAbierto && <GlosarioModal onCerrar={() => setGlosarioAbierto(false)} />}
        </div>
    )
}
