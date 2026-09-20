import { useMemo } from 'react'
import { Trophy, Skull } from 'lucide-react'

type Props = {
    resultado: 'victoria' | 'derrota'
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

export default function ResultadoPartida({ resultado }: Props) {
    const esVictoria = resultado === 'victoria'
    const confeti = useMemo(() => (esVictoria ? generarConfeti() : []), [esVictoria])

    return (
        <div
            className={`resultado-partida relative overflow-hidden rounded-xl border p-8 text-center ${
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
        </div>
    )
}
