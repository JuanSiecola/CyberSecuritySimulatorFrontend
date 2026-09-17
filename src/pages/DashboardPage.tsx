import { useDashboard } from '../hooks/useDashboard'
import MetricCard from '../components/MetricCard'
import ActividadActualCard from '../components/ActividadActualCard'

export default function DashboardPage() {
    const { empresa, actividadPendiente, recientes, cargando, error, resolver } = useDashboard()

    if (cargando) {
        return <div className="text-slate-400 p-8">Cargando partida...</div>
    }

    if (error || !empresa) {
        return <div className="text-red-400 p-8">{error ?? 'No se pudo cargar la empresa'}</div>
    }

    return (
        <div className="flex flex-col gap-6 px-8 pb-8">
            <div className="grid grid-cols-3 gap-4">
                <MetricCard
                    label="Seguridad"
                    valor={empresa.seguridad}
                    max={100}
                    estado={empresa.seguridad >= 60 ? 'bueno' : empresa.seguridad >= 30 ? 'atencion' : 'critico'}
                />
                <MetricCard
                    label="Reputación"
                    valor={empresa.reputacion}
                    max={100}
                    estado={empresa.reputacion >= 60 ? 'bueno' : empresa.reputacion >= 30 ? 'atencion' : 'critico'}
                />
                <MetricCard
                    label="Dinero"
                    valor={empresa.dinero}
                    formatoMoneda
                    estado={empresa.dinero >= 5000 ? 'bueno' : 'atencion'}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    {actividadPendiente ? (
                        <ActividadActualCard
                            actividad={actividadPendiente}
                            onResolver={(accion) => resolver(actividadPendiente.id, accion)}
                        />
                    ) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-md p-5 text-slate-400">
                            No hay actividades pendientes por ahora.
                        </div>
                    )}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-md p-4">
                    <h3 className="text-slate-200 text-sm font-medium mb-3">Actividad reciente</h3>
                    <ul className="flex flex-col gap-2">
                        {recientes.map((a) => (
                            <li key={a._id} className="text-sm text-slate-400 flex justify-between">
                                <span>{a.descripcion}</span>
                                <span className="text-xs text-slate-500">{a.estado}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}