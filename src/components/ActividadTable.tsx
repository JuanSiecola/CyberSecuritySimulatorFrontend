import { Badge } from './ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table'
import type { ActividadResumen, NivelRiesgo } from '../types/dashboard.types'

function nivelRiesgoTexto(nivelRiesgo: number): NivelRiesgo {
    if (nivelRiesgo >= 60) return 'alto'
    if (nivelRiesgo >= 30) return 'medio'
    return 'bajo'
}

function claseRiesgo(nivelRiesgo: NivelRiesgo) {
    const clases = {
        alto: 'border-red-500/30 bg-red-500/10 text-red-400',
        medio: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        bajo: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    }
    return clases[nivelRiesgo]
}

function claseEstado(estado: ActividadResumen['estado']) {
    const clases = {
        pendiente: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        resuelta: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        ignorada: 'border-slate-700 bg-slate-800 text-slate-400',
    }
    return clases[estado]
}

export default function ActividadTable({ actividades }: { actividades: ActividadResumen[] }) {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
            <Table>
                <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-400">Descripción</TableHead>
                        <TableHead className="text-slate-400">Tipo</TableHead>
                        <TableHead className="text-slate-400">Nivel de riesgo</TableHead>
                        <TableHead className="text-slate-400">Estado</TableHead>
                        <TableHead className="text-right text-slate-400">Turno</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {actividades.map((actividad) => {
                        const riesgo = nivelRiesgoTexto(actividad.nivelRiesgo)

                        return (
                            <TableRow key={actividad._id} className="border-slate-800 text-slate-300">
                                <TableCell className="font-medium text-slate-100">{actividad.descripcion}</TableCell>
                                <TableCell className="font-mono text-sm text-slate-400">{actividad.tipo}</TableCell>
                                <TableCell>
                                    <Badge className={claseRiesgo(riesgo)}>{riesgo}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={claseEstado(actividad.estado)}>{actividad.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono text-sm text-slate-400">
                                    {actividad.turno}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}