import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react'
import type { ActividadActual, AccionResolucion } from '../types/dashboard.types'

const colorPorRiesgo: Record<ActividadActual['nivelRiesgo'], string> = {
    alto: 'border-l-red-500',
    medio: 'border-l-amber-500',
    bajo: 'border-l-emerald-500',
}

const riesgoConfig: Record<ActividadActual['nivelRiesgo'], { etiqueta: string; icono: typeof ShieldAlert; clases: string }> = {
    alto: { etiqueta: 'Riesgo alto', icono: ShieldAlert, clases: 'border-red-400/40 bg-red-500/15 text-red-200 shadow-sm shadow-red-950/30' },
    medio: { etiqueta: 'Riesgo medio', icono: ShieldQuestion, clases: 'border-amber-300/40 bg-amber-400/15 text-amber-100 shadow-sm shadow-amber-950/30' },
    bajo: { etiqueta: 'Riesgo bajo', icono: ShieldCheck, clases: 'border-emerald-300/40 bg-emerald-400/15 text-emerald-100 shadow-sm shadow-emerald-950/30' },
}
function DetalleActividad({ actividad }: { actividad: ActividadActual }) {
    if (actividad.tipo === 'email') {
        return (
            <dl className="font-mono text-sm text-slate-300 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                {actividad.titulo && <><dt className="text-slate-500">asunto:</dt><dd>{actividad.titulo}</dd></>}
                <dt className="text-slate-500">de:</dt>
                <dd>{actividad.remitente}</dd>
                <dt className="text-slate-500">para:</dt>
                <dd>{actividad.destinatario}</dd>
                <dt className="text-slate-500">contenido:</dt>
                <dd className="font-sans text-slate-200">{actividad.contenido}</dd>
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
            <dt className="text-slate-500">acceso:</dt>
            <dd>{actividad.tipoAcceso}</dd>
            <dt className="text-slate-500">detalle:</dt>
            <dd className="font-sans text-slate-200">{actividad.contenido}</dd>
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
                {(() => {
                    const riesgo = riesgoConfig[actividad.nivelRiesgo]
                    const IconoRiesgo = riesgo.icono
                    return <Badge className={`h-7 rounded-full border px-3 text-xs font-semibold tracking-wide ${riesgo.clases}`}><IconoRiesgo className="size-3.5" />{riesgo.etiqueta}</Badge>
                })()}
            </div>

            <DetalleActividad actividad={actividad} />

            <div className="flex gap-2 pt-2">
                <Button className="border-slate-600 bg-slate-800/70 text-slate-100 hover:border-teal-300/60 hover:bg-teal-400/15 hover:text-teal-100" variant="outline" disabled={cargando} onClick={() => onResolver('permitir')}>
                    Permitir
                </Button>
                <Button className="border-red-400/40 bg-red-500/10 text-red-300 hover:border-red-300/70 hover:bg-red-500/20 hover:text-red-100" variant="destructive" disabled={cargando} onClick={() => onResolver('bloquear')}>
                    Bloquear
                </Button>
            </div>
        </div>
    )
}