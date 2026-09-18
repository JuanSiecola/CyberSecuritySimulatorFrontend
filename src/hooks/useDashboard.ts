import { useEffect, useState, useCallback } from 'react'
import * as dashboardApi from '../api/dashboard.api'
import type { Empresa, ActividadActual, ActividadResumen, AccionResolucion } from '../types/dashboard.types'

function nivelRiesgoTexto(nivelRiesgo: number): 'alto' | 'medio' | 'bajo' {
    if (nivelRiesgo >= 60) return 'alto'
    if (nivelRiesgo >= 30) return 'medio'
    return 'bajo'
}

export function useDashboard() {
    const [empresa, setEmpresa] = useState<Empresa | null>(null)
    const [actividadPendiente, setActividadPendiente] = useState<ActividadActual | null>(null)
    const [pendientes, setPendientes] = useState<ActividadResumen[]>([])
    const [recientes, setRecientes] = useState<{ _id: string; descripcion: string; estado: string }[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const cargarTodo = useCallback(async () => {
        setCargando(true)
        setError(null)
        try {
            const jugadorGuardado = JSON.parse(localStorage.getItem('jugador') ?? 'null')
            let empresaId = jugadorGuardado?.empresaId as string | null

            let empresaActual: Empresa
            if (!empresaId) {
                empresaActual = await dashboardApi.crearEmpresa()
                empresaId = empresaActual._id
                localStorage.setItem('jugador', JSON.stringify({ ...jugadorGuardado, empresaId }))
            } else {
                empresaActual = await dashboardApi.obtenerEmpresa(empresaId)
            }
            setEmpresa(empresaActual)

            const [pendientes, todas] = await Promise.all([
                dashboardApi.listarActividades(empresaId, 'pendiente'),
                dashboardApi.listarActividades(empresaId),
            ])
            setPendientes(pendientes)

            if (pendientes[0]) {
                const detalle = await dashboardApi.obtenerDetalleActividad(pendientes[0]._id)
                setActividadPendiente({
                    id: detalle._id,
                    descripcion: detalle.descripcion,
                    nivelRiesgo: nivelRiesgoTexto(detalle.nivelRiesgo),
                    ...detalle,
                })
            } else {
                setActividadPendiente(null)
            }

            setRecientes(todas.filter((a) => a.estado !== 'pendiente').slice(0, 5))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar el dashboard')
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => {
        cargarTodo()
    }, [cargarTodo])

    async function resolver(actividadId: string, accion: AccionResolucion) {
        await dashboardApi.resolverActividad(actividadId, accion)
        await cargarTodo()
    }

    return { empresa, actividadPendiente, pendientes, recientes, cargando, error, resolver }
}