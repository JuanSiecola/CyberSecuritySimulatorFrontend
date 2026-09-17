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

function DetalleActividad({ actividad }: { actividad: ActividadActual }) {
    if (actividad.tipo === 'email') {
        return (
            <dl className="font-mono text-sm text-slate-300 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                <dt className="text-slate-500">de:</dt>
                <dd>{actividad.remitente}</dd>
                <dt className="text-slate-500">para:</dt>
                <dd>{actividad.destinatario}</dd>
                {actividad.enlace && (
                    <>
                        <dt className="text-slate-500">enlace:</dt>
                        <dd className="text-red-400 break-all">{actividad.enlace}</dd>
                    </>
                )}
            </dl>
        )
    }

    return (
        <dl className="font-mono text-sm text-slate-300 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="text-slate-500">usuario:</dt>
            <dd>{actividad.usuario}</dd>
            <dt className="text-slate-500">ip:</dt>
            <dd>{actividad.direccionIp}</dd>
            <dt className="text-slate-500">ubicación:</dt>
            <dd>{actividad.ubicacion}</dd>
            <dt className="text-slate-500">dispositivo:</dt>
            <dd>{actividad.dispositivo}</dd>
        </dl>
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
                <Button variant="outline" disabled={cargando} onClick={() => onResolver('ignorar')}>
                    Ignorar
                </Button>
                <Button variant="destructive" disabled={cargando} onClick={() => onResolver('reportar')}>
                    Reportar
                </Button>
                <Button disabled={cargando} onClick={() => onResolver('investigar')}>
                    Investigar
                </Button>
            </div>
        </div>
    )
}