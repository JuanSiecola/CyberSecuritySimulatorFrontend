import { Mail } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import type { ActividadActual, AccionResolucion } from '../types/dashboard.types'

const colorPorRiesgo: Record<ActividadActual['nivelRiesgo'], string> = {
    alto: 'border-l-red-500',
    medio: 'border-l-amber-500',
    bajo: 'border-l-emerald-500',
}

const badgePorRiesgo: Record<ActividadActual['nivelRiesgo'], string> = {
    alto: 'bg-red-500/10 text-red-400 border-red-500/30',
    medio: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    bajo: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

// El backend siempre manda correo + logs juntos en cada ticket, así
// que acá se muestran los dos, no uno u otro.
function DetalleActividad({ actividad }: { actividad: ActividadActual }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/70 px-4 py-2.5">
                    <Mail className="size-4 text-teal-300" />
                    <span className="text-sm font-semibold text-slate-100">{actividad.correo.titulo}</span>
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 px-4 py-3 text-sm">
                    <dt className="text-slate-500">De</dt>
                    <dd className="truncate font-medium text-slate-200">{actividad.correo.remitente}</dd>
                    <dt className="text-slate-500">Para</dt>
                    <dd className="truncate text-slate-300">{actividad.correo.destinatario}</dd>
                    {actividad.correo.enlace && (
                        <>
                            <dt className="text-slate-500">Enlace</dt>
                            <dd className="break-all font-mono text-sm text-red-400">{actividad.correo.enlace}</dd>
                        </>
                    )}
                </dl>
                <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-300">
                    {actividad.correo.contenido}
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Logs de evidencia</p>
                <ul className="flex flex-col gap-1.5 font-mono text-sm text-slate-400">
                    {actividad.logs.map((log, indice) => (
                        <li key={indice} className="rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2">
                            <span className="text-slate-500">[{log.archivo} {log.hora}]</span> {log.contenido}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

type Props = {
    actividad: ActividadActual
    onResolver: (accion: AccionResolucion) => void
    cargando?: boolean
}

export default function ActividadActualCard({ actividad, onResolver, cargando }: Props) {
    return (
        <div className={`bg-slate-900 border border-slate-800 border-l-4 ${colorPorRiesgo[actividad.nivelRiesgo]} rounded-md p-5 flex flex-col gap-4`}>
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-slate-100 font-medium">{actividad.descripcion}</h3>
                <Badge className={badgePorRiesgo[actividad.nivelRiesgo]}>
                    Riesgo {actividad.nivelRiesgo}
                </Badge>
            </div>

            <DetalleActividad actividad={actividad} />

            <div className="flex gap-2 pt-2">
                <Button variant="destructive" disabled={cargando} onClick={() => onResolver('bloquear')}>
                    Bloquear
                </Button>
                <Button disabled={cargando} onClick={() => onResolver('permitir')}>
                    Permitir
                </Button>
            </div>
        </div>
    )
}
