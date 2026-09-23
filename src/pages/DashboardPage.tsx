import { useState } from 'react'
import { useDashboard } from '../hooks/useDashboard'
import MetricCard from '../components/MetricCard'
import ActividadActualCard from '../components/ActividadActualCard'
import ResultadoPartida from '../components/ResultadoPartida'
import { Button } from '../components/ui/button'
import { Activity, ArrowRight, CalendarDays, CheckCircle2, Clock3, FileText, Flag, KeyRound, Laptop, Mail, MapPin, ShieldCheck, Users, WalletCards } from 'lucide-react'

function formatoSigno(valor: number) {
    return valor >= 0 ? `+${valor}` : `${valor}`
}
function obtenerNombreJugador() {
    try {
        const jugador = JSON.parse(localStorage.getItem('jugador') ?? 'null') as { nombre?: unknown }
        return typeof jugador?.nombre === 'string' && jugador.nombre.trim() ? jugador.nombre.trim() : 'Analista'
    } catch {
        return 'Analista'
    }
}

export default function DashboardPage() {
    const { empresa, actividadPendiente, pendientes, resueltasTurno, ultimoResultado, cargando, error, resolver, avanzarTurno, rendirse, reiniciarPartida, seleccionarActividad } = useDashboard()
    const [confirmandoRendicion, setConfirmandoRendicion] = useState(false)
    const nombreJugador = obtenerNombreJugador()

    if (cargando && !empresa) return <div className="p-8 text-slate-400">Cargando partida...</div>
    if (error || !empresa) return <div className="p-8 text-red-400">{error ?? 'No se pudo cargar la empresa'}</div>

    const iconosDescripcion = [Mail, MapPin, KeyRound, Laptop, FileText]
    const partidaTerminada = empresa.estado !== 'activa'
    const claseEstado = empresa.estado === 'activa'
        ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
        : empresa.estado === 'victoria'
            ? 'border-teal-300/30 bg-teal-300/10 text-teal-200'
            : 'border-red-400/30 bg-red-400/10 text-red-300'

    function irALaActividadActual() {
        document.getElementById('actividad-actual')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    function analizarActividad(actividadId: string) {
        seleccionarActividad(actividadId)
        irALaActividadActual()
    }

    return (
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 pb-8 pt-5 sm:px-6 lg:px-8">
            <section className="relative overflow-hidden rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-5 py-5 sm:px-6">
                <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full border border-emerald-300/10" />
                <p className="relative text-xs uppercase tracking-[0.2em] text-emerald-300">Sesión iniciada correctamente</p>
                <h1 className="relative mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Bienvenido, {nombreJugador}</h1>
                <p className="relative mt-2 max-w-2xl text-sm leading-6 text-slate-400">Tu centro de operaciones está listo. Revisá las actividades y tomá el control del próximo incidente.</p>
            </section>
            <div className="flex items-end justify-between gap-4">
                <div><p className="text-xs uppercase tracking-[0.18em] text-teal-300">Centro de operaciones</p><h1 className="mt-1 text-2xl font-semibold text-slate-100">Resumen de seguridad</h1><p className="mt-1 text-sm text-slate-400">Revisa y atiende las actividades antes de avanzar el turno.</p></div>
                <div className="hidden items-center gap-3 sm:flex">
                    <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200">
                        <CalendarDays className="size-4 text-teal-300" />
                        <span>Turno <span className="font-mono text-teal-200">{empresa.turno}</span> / {empresa.maxTurnos}</span>
                    </div>
                    <span className={`rounded-full border px-3.5 py-2 text-sm font-medium capitalize ${claseEstado}`}>{empresa.estado}</span>

                    {!partidaTerminada && (
                        confirmandoRendicion ? (
                            <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 py-1 pr-1 pl-3.5 text-sm text-red-300">
                                <span>Â¿Rendirte?</span>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    disabled={cargando}
                                    onClick={() => { setConfirmandoRendicion(false); rendirse() }}
                                    className="rounded-full"
                                >
                                    SÃ­, rendirme
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setConfirmandoRendicion(false)}
                                    className="rounded-full text-slate-400 hover:text-slate-200"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setConfirmandoRendicion(true)}
                                className="rounded-full text-slate-400 hover:border-red-500/40 hover:text-red-300"
                            >
                                <Flag className="size-3.5" /> Rendirse
                            </Button>
                        )
                    )}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard label="Seguridad" valor={empresa.seguridad} max={100} estado={empresa.seguridad >= 60 ? 'bueno' : empresa.seguridad >= 30 ? 'atencion' : 'critico'} />
                <MetricCard label="Reputación" valor={empresa.reputacion} max={100} estado={empresa.reputacion >= 60 ? 'bueno' : empresa.reputacion >= 30 ? 'atencion' : 'critico'} />
                <MetricCard label="Dinero" valor={empresa.dinero} formatoMoneda estado={empresa.dinero >= 5000 ? 'bueno' : 'atencion'} />
            </div>

            {ultimoResultado && (
                <div className={`rounded-lg border px-4 py-3 text-sm ${ultimoResultado.correcta ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
                    {ultimoResultado.correcta ? 'DecisiÃ³n correcta.' : 'DecisiÃ³n incorrecta.'}{' '}
                    {ultimoResultado.esMaliciosa ? 'La actividad era maliciosa.' : 'La actividad no era maliciosa.'}{' '}
                    Impacto: seguridad {formatoSigno(ultimoResultado.impacto.seguridad)}, reputaciÃ³n {formatoSigno(ultimoResultado.impacto.reputacion)}, dinero {formatoSigno(ultimoResultado.impacto.dinero)}.
                </div>
            )}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-5">
                    {partidaTerminada && (
                        <ResultadoPartida
                            resultado={empresa.estado === 'victoria' ? 'victoria' : 'derrota'}
                            onReiniciar={reiniciarPartida}
                            cargando={cargando}
                        />
                    )}
                    {!partidaTerminada && actividadPendiente && <div id="actividad-actual"><ActividadActualCard actividad={actividadPendiente} onResolver={(accion) => resolver(actividadPendiente.id, accion)} cargando={cargando} /></div>}
                    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/70">
                        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div className="flex items-center gap-3"><Activity className="size-5 text-teal-300" /><div><h2 className="font-medium text-slate-100">Actividades pendientes</h2><p className="text-xs text-slate-500">Atiende cada actividad para avanzar el turno.</p></div></div><span className="text-xs text-slate-400">{pendientes.length} actividades</span></div>
                        <div className="divide-y divide-slate-800/80">
                            {pendientes.length ? pendientes.map((actividad, index) => { const Icon = iconosDescripcion[index % iconosDescripcion.length]; return <div key={actividad._id} className="flex items-center gap-3 px-5 py-3.5"><div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-teal-400/10 text-teal-300"><Icon className="size-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{actividad.descripcion}</p><p className="text-xs text-slate-500">Correo de {actividad.correo.remitente}</p></div><span className="hidden rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-400 sm:inline">Pendiente</span><span className="hidden items-center gap-1 text-xs text-slate-400 md:flex"><Clock3 className="size-3.5" /> Turno {actividad.turno}</span><button className="inline-flex items-center gap-1 rounded-md border border-teal-300/40 bg-teal-300/10 px-3 py-2 text-xs font-medium text-teal-200 transition-colors hover:border-teal-200/70 hover:bg-teal-300/20 hover:text-teal-100" onClick={() => analizarActividad(actividad._id)}>Analizar <ArrowRight className="size-3.5" /></button></div> }) : <div className="flex flex-col items-center gap-3 px-5 py-10 text-center text-sm text-slate-500"><span>No hay actividades pendientes por ahora.</span>{!partidaTerminada && (
                                <Button
                                    size="lg"
                                    disabled={cargando}
                                    onClick={avanzarTurno}
                                    className="rounded-full px-6 font-semibold shadow-lg shadow-teal-950/30 transition-transform active:scale-[0.98]"
                                >
                                    Siguiente turno <ArrowRight className="size-4" />
                                </Button>
                            )}</div>}
                        </div>
                    </section>
                </div>
                <aside className="space-y-5">
                    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"><div className="mb-4 flex items-center gap-2"><Users className="size-4 text-teal-300" /><h2 className="text-sm font-medium text-slate-100">Estado de la empresa</h2></div><dl className="space-y-3 text-xs"><div className="flex justify-between"><dt className="text-slate-500">Estado</dt><dd className="text-emerald-300">{empresa.estado}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Turno actual</dt><dd className="text-slate-200">{empresa.turno} / {empresa.maxTurnos}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Actividades abiertas</dt><dd className="text-slate-200">{pendientes.length}</dd></div></dl></section>
                    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"><div className="mb-4 flex items-center gap-2"><ShieldCheck className="size-4 text-teal-300" /><h2 className="text-sm font-medium text-slate-100">Resumen del turno</h2></div><div className="space-y-3 text-xs"><div className="flex justify-between text-slate-400"><span className="flex items-center gap-2"><Clock3 className="size-3.5" />Pendientes</span><strong className="text-amber-300">{pendientes.length}</strong></div><div className="flex justify-between text-slate-400"><span className="flex items-center gap-2"><CheckCircle2 className="size-3.5" />Resueltas</span><strong className="text-teal-300">{resueltasTurno}</strong></div><div className="flex justify-between text-slate-400"><span className="flex items-center gap-2"><WalletCards className="size-3.5" />Dinero</span><strong className="text-slate-200">${empresa.dinero.toLocaleString('es-UY')}</strong></div></div></section>
                </aside>
            </div>
        </div>
    )
}



