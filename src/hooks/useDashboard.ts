import { useEffect, useState, useCallback } from 'react'
import * as dashboardApi from '../api/dashboard.api'
import type {
    Empresa,
    ActividadActual,
    ActividadResumen,
    AccionResolucion,
    ResolverResultado,
} from '../types/dashboard.types'

function nivelRiesgoTexto(nivelRiesgo: number): 'alto' | 'medio' | 'bajo' {
    if (nivelRiesgo >= 60) return 'alto'
    if (nivelRiesgo >= 30) return 'medio'
    return 'bajo'
}

function extraerError(err: unknown, fallback: string) {
    if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { error?: string } } }).response
        if (res?.data?.error) return res.data.error
    }
    if (err instanceof Error) return err.message
    return fallback
}

export function useDashboard() {
    const [empresa, setEmpresa] = useState<Empresa | null>(null)
    const [actividadPendiente, setActividadPendiente] = useState<ActividadActual | null>(null)
    const [pendientes, setPendientes] = useState<ActividadResumen[]>([])
    const [recientes, setRecientes] = useState<{ _id: string; descripcion: string; estado: string }[]>([])
    const [resueltasTurno, setResueltasTurno] = useState(0)
    const [ultimoResultado, setUltimoResultado] = useState<ResolverResultado | null>(null)
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
                    ...detalle,
                    id: detalle._id,
                    nivelRiesgo: nivelRiesgoTexto(detalle.nivelRiesgo),
                })
            } else {
                setActividadPendiente(null)
            }

            setRecientes(todas.filter((a) => a.estado !== 'pendiente').slice(0, 5))
            setResueltasTurno(todas.filter((a) => a.estado === 'resuelta' && a.turno === empresaActual.turno).length)
        } catch (err) {
            setError(extraerError(err, 'Error al cargar el dashboard'))
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => {
        cargarTodo()
    }, [cargarTodo])

    async function resolver(actividadId: string, accion: AccionResolucion) {
        setCargando(true)
        setError(null)
        try {
            const resultado = await dashboardApi.resolverActividad(actividadId, accion)
            setUltimoResultado(resultado)
            await cargarTodo()
        } catch (err) {
            setError(extraerError(err, 'Error al resolver la actividad'))
            setCargando(false)
        }
    }

    async function avanzarTurno() {
        if (!empresa) return
        setCargando(true)
        setError(null)
        try {
            await dashboardApi.avanzarTurno(empresa._id)
            setUltimoResultado(null)
            await cargarTodo()
        } catch (err) {
            setError(extraerError(err, 'Error al avanzar de turno'))
            setCargando(false)
        }
    }

    async function rendirse() {
        if (!empresa) return
        setCargando(true)
        setError(null)
        try {
            await dashboardApi.rendirseEmpresa(empresa._id)
            setUltimoResultado(null)
            await cargarTodo()
        } catch (err) {
            setError(extraerError(err, 'Error al rendirse'))
            setCargando(false)
        }
    }

    return { empresa, actividadPendiente, pendientes, recientes, resueltasTurno, ultimoResultado, cargando, error, resolver, avanzarTurno, rendirse }
}
