import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Skull, RotateCcw, History, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '../hooks/useAuth'

type Props = {
    resultado: 'victoria' | 'derrota'
    onReiniciar: () => void
    cargando?: boolean
}

const COLORES_CONFETI = ['#2dd4bf', '#34d399', '#fbbf24', '#38bdf8', '#f472b6']

function generarConfeti() {
    return Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORES_CONFETI[i % COLORES_CONFETI.length],
        delay: Math.random() * 1.2,
        duracion: 1.6 + Math.random() * 1.2,
    }))
}

// Se muestra como ventana emergente (modal) en cuanto la partida termina,
// tapando el resto del dashboard, para que el jugador tenga que elegir
// explícitamente qué hacer a continuación: no queda como una tarjeta más
// mezclada en la pantalla.
export default function ResultadoPartida({ resultado, onReiniciar, cargando }: Props) {
    const esVictoria = resultado === 'victoria'
    const confeti = useMemo(() => (esVictoria ? generarConfeti() : []), [esVictoria])
    const navigate = useNavigate()
    const { cerrarSesion } = useAuth()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div
                className={`resultado-partida relative w-full max-w-md overflow-hidden rounded-xl border p-8 text-center shadow-2xl ${
                    esVictoria
                        ? 'border-teal-400/30 bg-gradient-to-b from-teal-400/10 to-slate-900'
                        : 'border-red-500/30 bg-gradient-to-b from-red-500/10 to-slate-900'
                }`}
            >
                {esVictoria && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        {confeti.map((pieza) => (
                            <span
                                key={pieza.id}
                                className="confeti-pieza absolute top-[-5%] block h-2.5 w-1.5 rounded-sm"
                                style={{
                                    left: `${pieza.left}%`,
                                    backgroundColor: pieza.color,
                                    animationDelay: `${pieza.delay}s`,
                                    animationDuration: `${pieza.duracion}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                <div
                    className={`relative mx-auto flex size-16 items-center justify-center rounded-full ${
                        esVictoria ? 'icono-victoria bg-teal-400/15 text-teal-300' : 'icono-derrota bg-red-500/15 text-red-400'
                    }`}
                >
                    {esVictoria ? <Trophy className="size-8" /> : <Skull className="size-8" />}
                </div>

                <h2 className={`relative mt-4 text-2xl font-bold tracking-tight ${esVictoria ? 'text-teal-200' : 'text-red-300'}`}>
                    {esVictoria ? '¡Victoria!' : 'Derrota'}
                </h2>
                <p className="relative mt-2 text-sm text-slate-400">
                    {esVictoria
                        ? 'Mantuviste la empresa a salvo hasta el final de la partida.'
                        : 'La empresa no pudo sostener sus métricas y la partida terminó acá.'}
                </p>

                <div className="relative mt-6 flex flex-col gap-2">
                    <Button
                        size="lg"
                        disabled={cargando}
                        onClick={onReiniciar}
                        className="rounded-full font-semibold shadow-lg shadow-teal-950/30"
                    >
                        <RotateCcw className="size-4" /> Reiniciar partida
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/historial')}
                        className="rounded-full"
                    >
                        <History className="size-4" /> Ver historial
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        onClick={cerrarSesion}
                        className="rounded-full text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="size-4" /> Terminar
                    </Button>
                </div>
            </div>
        </div>
    )
}
