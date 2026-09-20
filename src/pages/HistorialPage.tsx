import { Trophy } from 'lucide-react'
import { useRanking } from '../hooks/useRanking'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table'
import type { Jugador } from '../types/auth.types'

function obtenerJugadorActual(): Jugador | null {
    try {
        const jugador = JSON.parse(localStorage.getItem('jugador') ?? 'null') as Partial<Jugador> | null
        return jugador && typeof jugador._id === 'string' ? jugador as Jugador : null
    } catch {
        return null
    }
}

const medallaPorPosicion: Record<number, string> = {
    1: 'text-amber-400',
    2: 'text-slate-300',
    3: 'text-amber-700',
}

function formatearFecha(fecha: string) {
    return new Date(fecha).toLocaleDateString('es-UY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

export default function HistorialPage() {
    const { ranking, cargando, error } = useRanking()
    const jugadorActual = obtenerJugadorActual()

    return (
        <div className="flex flex-col gap-6 px-8 pb-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Historial</h1>
                <p className="mt-1 text-sm text-slate-400">Ranking global de partidas finalizadas, ordenado por seguridad, reputación y dinero.</p>
            </div>

            {cargando && <p className="text-slate-400">Cargando ranking...</p>}
            {error && (
                <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">{error}</p>
            )}

            {!cargando && !error && ranking.length === 0 && (
                <p className="rounded-md border border-slate-800 bg-slate-900/70 px-4 py-3 text-slate-400">
                    Todavía no hay ninguna partida finalizada. Cuando una empresa gane o pierda, va a aparecer acá.
                </p>
            )}

            {!cargando && !error && ranking.length > 0 && (
                <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-transparent">
                                <TableHead className="text-slate-400">#</TableHead>
                                <TableHead className="text-slate-400">Jugador</TableHead>
                                <TableHead className="text-slate-400">Seguridad</TableHead>
                                <TableHead className="text-slate-400">Reputación</TableHead>
                                <TableHead className="text-slate-400">Dinero</TableHead>
                                <TableHead className="text-right text-slate-400">Fecha</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ranking.map((entrada) => {
                                const esJugadorActual = jugadorActual?._id === entrada.jugadorId

                                return (
                                    <TableRow
                                        key={entrada._id}
                                        className={`border-slate-800 text-slate-300 ${esJugadorActual ? 'bg-teal-400/5' : ''}`}
                                    >
                                        <TableCell className="font-mono text-sm text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                {entrada.posicion <= 3 && (
                                                    <Trophy className={`size-4 ${medallaPorPosicion[entrada.posicion]}`} />
                                                )}
                                                {entrada.posicion}
                                            </span>
                                        </TableCell>
                                        <TableCell className={`font-medium ${esJugadorActual ? 'text-teal-300' : 'text-slate-100'}`}>
                                            {entrada.nombreJugador}
                                            {esJugadorActual && <span className="ml-2 text-xs font-normal text-teal-400">(vos)</span>}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{entrada.seguridadFinal}</TableCell>
                                        <TableCell className="font-mono text-sm">{entrada.reputacionFinal}</TableCell>
                                        <TableCell className="font-mono text-sm">${entrada.dineroFinal.toLocaleString('es-UY')}</TableCell>
                                        <TableCell className="text-right font-mono text-sm text-slate-400">
                                            {formatearFecha(entrada.createdAt)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}
