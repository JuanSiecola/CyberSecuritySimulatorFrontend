import { useDashboard } from '../hooks/useDashboard'
import MetricCard from '../components/MetricCard'
import ActividadActualCard from '../components/ActividadActualCard'
import { Activity, ArrowRight, CalendarDays, CheckCircle2, Clock3, FileText, KeyRound, Laptop, Mail, MapPin, ShieldCheck, Users, WalletCards } from 'lucide-react'

export default function DashboardPage() {
    const { empresa, actividadPendiente, pendientes, recientes, cargando, error, resolver } = useDashboard()

    if (cargando) return <div className="p-8 text-slate-400">Cargando partida...</div>
    if (error || !empresa) return <div className="p-8 text-red-400">{error ?? 'No se pudo cargar la empresa'}</div>

    const iconosDescripcion = [Mail, MapPin, KeyRound, Laptop, FileText]

    return (
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-4 pb-8 pt-5 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
                <div><p className="text-xs uppercase tracking-[0.18em] text-teal-300">Centro de operaciones</p><h1 className="mt-1 text-2xl font-semibold text-slate-100">Resumen de seguridad</h1><p className="mt-1 text-sm text-slate-400">Revisa y atiende las actividades antes de avanzar el turno.</p></div>
                <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex"><CalendarDays className="size-4 text-teal-300" /><span>Turno {empresa.turno}</span></div><span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300 sm:inline-flex">{empresa.estado}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard label="Seguridad" valor={empresa.seguridad} max={100} estado={empresa.seguridad >= 60 ? 'bueno' : empresa.seguridad >= 30 ? 'atencion' : 'critico'} />
                <MetricCard label="Reputación" valor={empresa.reputacion} max={100} estado={empresa.reputacion >= 60 ? 'bueno' : empresa.reputacion >= 30 ? 'atencion' : 'critico'} />
                <MetricCard label="Dinero" valor={empresa.dinero} formatoMoneda estado={empresa.dinero >= 5000 ? 'bueno' : 'atencion'} />
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div className="space-y-5">
                    {actividadPendiente && <ActividadActualCard actividad={actividadPendiente} onResolver={(accion) => resolver(actividadPendiente.id, accion)} />}
                    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/70">
                        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div className="flex items-center gap-3"><Activity className="size-5 text-teal-300" /><div><h2 className="font-medium text-slate-100">Actividades pendientes</h2><p className="text-xs text-slate-500">Atiende cada actividad para avanzar el turno.</p></div></div><span className="text-xs text-slate-400">{pendientes.length} actividades</span></div>
                        <div className="divide-y divide-slate-800/80">
                            {pendientes.length ? pendientes.map((actividad, index) => { const Icon = iconosDescripcion[index % iconosDescripcion.length]; return <div key={actividad._id} className="flex items-center gap-3 px-5 py-3.5"><div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-teal-400/10 text-teal-300"><Icon className="size-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{actividad.descripcion}</p><p className="text-xs text-slate-500">{actividad.tipo === 'email' ? 'Revisión de correo electrónico' : 'Actividad de acceso y dispositivo'}</p></div><span className="hidden rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-400 sm:inline">Pendiente</span><span className="hidden items-center gap-1 text-xs text-slate-400 md:flex"><Clock3 className="size-3.5" /> Turno {actividad.turno}</span><button className="inline-flex items-center gap-1 rounded-md border border-teal-300/40 bg-teal-300/10 px-3 py-2 text-xs font-medium text-teal-200 transition-colors hover:bg-teal-300/20" onClick={() => actividadPendiente?.id === actividad._id && resolver(actividadPendiente.id, 'investigar')}>Analizar <ArrowRight className="size-3.5" /></button></div> }) : <div className="px-5 py-10 text-center text-sm text-slate-500">No hay actividades pendientes por ahora.</div>}
                        </div>
                    </section>
                </div>
                <aside className="space-y-5">
                    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"><div className="mb-4 flex items-center gap-2"><Users className="size-4 text-teal-300" /><h2 className="text-sm font-medium text-slate-100">Estado de la empresa</h2></div><dl className="space-y-3 text-xs"><div className="flex justify-between"><dt className="text-slate-500">Estado</dt><dd className="text-emerald-300">{empresa.estado}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Turno actual</dt><dd className="text-slate-200">{empresa.turno}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Actividades abiertas</dt><dd className="text-slate-200">{pendientes.length}</dd></div></dl></section>
                    <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4"><div className="mb-4 flex items-center gap-2"><ShieldCheck className="size-4 text-teal-300" /><h2 className="text-sm font-medium text-slate-100">Resumen del turno</h2></div><div className="space-y-3 text-xs"><div className="flex justify-between text-slate-400"><span className="flex items-center gap-2"><Clock3 className="size-3.5" />Pendientes</span><strong className="text-amber-300">{pendientes.length}</strong></div><div className="flex justify-between text-slate-400"><span className="flex items-center gap-2"><CheckCircle2 className="size-3.5" />Resueltas</span><strong className="text-teal-300">{recientes.filter((a) => a.estado === 'resuelta').length}</strong></div><div className="flex justify-between text-slate-400"><span className="flex items-center gap-2"><WalletCards className="size-3.5" />Dinero</span><strong className="text-slate-200">${empresa.dinero.toLocaleString('es-UY')}</strong></div></div></section>
                </aside>
            </div>
        </div>
    )
}