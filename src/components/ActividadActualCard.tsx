import { Mail, Terminal } from 'lucide-react'
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

// La pantalla de la actividad solo muestra el correo: los logs de
// evidencia se investigan aparte, en la Consola, para que el jugador
// tenga que ir a buscarlos en vez de tenerlos ya servidos acá.
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
                <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-slate-300">
                    {actividad.correo.contenido}
                </p>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs text-slate-500">
                <Terminal className="size-3.5 text-teal-300" />
                ¿Necesitás más pistas? Los logs de evidencia de este ticket están en la Consola.
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
                {(() => {
                    const riesgo = riesgoConfig[actividad.nivelRiesgo]
                    const IconoRiesgo = riesgo.icono
                    return <Badge className={`h-7 rounded-full border px-3 text-xs font-semibold tracking-wide ${riesgo.clases}`}><IconoRiesgo className="size-3.5" />{riesgo.etiqueta}</Badge>
                })()}
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
