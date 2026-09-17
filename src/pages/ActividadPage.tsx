import ActividadTable from '../components/ActividadTable'
import { useActividades } from '../hooks/useActividades'

export default function ActividadPage() {
    const { actividades, cargando, error } = useActividades()

    return (
        <div className="flex flex-col gap-6 px-8 pb-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Actividad</h1>
                <p className="mt-1 text-sm text-slate-400">Registro de actividad de la partida actual.</p>
            </div>

            {cargando && <p className="text-slate-400">Cargando actividades...</p>}
            {error && <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">{error}</p>}
            {!cargando && !error && <ActividadTable actividades={actividades} />}
        </div>
    )
}