import type { MetricaProps } from '../types/dashboard.types'

const bordePorEstado: Record<MetricaProps['estado'], string> = {
    bueno: 'border-l-emerald-500',
    atencion: 'border-l-amber-500',
    critico: 'border-l-red-500',
}

function formatearValor(valor: number, formatoMoneda?: boolean) {
    if (formatoMoneda) return `$${valor.toLocaleString('es-UY')}`
    return valor.toString()
}

export default function MetricCard({ label, valor, max, formatoMoneda, tendencia, estado }: MetricaProps) {
    const porcentaje = max ? Math.min((valor / max) * 100, 100) : undefined

    return (
        <div className={`flex flex-col gap-2 rounded-lg border border-slate-800 border-l-4 bg-slate-900/80 p-4 shadow-lg shadow-black/10 ${bordePorEstado[estado]}`}>
            <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</span>
                {tendencia !== undefined && <span className={`font-mono text-xs ${tendencia >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{tendencia >= 0 ? '+' : ''}{tendencia} pts</span>}
            </div>
            <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-2xl tabular-nums text-slate-100">{formatearValor(valor, formatoMoneda)}</span>
                {max !== undefined && <span className="text-sm text-slate-500">/{max}</span>}
            </div>
            {porcentaje !== undefined && <div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${estado === 'critico' ? 'bg-red-400' : estado === 'atencion' ? 'bg-amber-300' : 'bg-teal-300'}`} style={{ width: `${porcentaje}%` }} /></div>}
        </div>
    )
}