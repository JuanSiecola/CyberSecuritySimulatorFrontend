import type { MetricaProps } from '../types/dashboard.types'

const bordePorEstado: Record<MetricaProps['estado'], string> = {
    bueno: 'border-l-emerald-500',
    atencion: 'border-l-amber-500',
    critico: 'border-l-red-500',
}

function formatearValor(valor: number, formatoMoneda?: boolean) {
    if (formatoMoneda) {
        return `$${valor.toLocaleString('es-UY')}`
    }
    return valor.toString()
}

export default function MetricCard({ label, valor, max, formatoMoneda, tendencia, estado }: MetricaProps) {
    return (
        <div className={`bg-slate-900 border border-slate-800 border-l-4 ${bordePorEstado[estado]} rounded-md p-4 flex flex-col gap-1`}>
            <span className="text-sm text-slate-400">{label}</span>

            <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-2xl text-slate-100 tabular-nums">
                    {formatearValor(valor, formatoMoneda)}
                </span>
                {max !== undefined && (
                    <span className="text-sm text-slate-500">/{max}</span>
                )}
            </div>

            {tendencia !== undefined && (
                <span className={`text-xs font-mono ${tendencia >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {tendencia >= 0 ? '+' : ''}{tendencia} pts vs. ayer
                </span>
            )}
        </div>
    )
}