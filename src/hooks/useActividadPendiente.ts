import { useCallback, useEffect, useState } from 'react'
import * as dashboardApi from '../api/dashboard.api'
import type { ActividadDetalleResponse } from '../types/dashboard.types'

function extraerError(err: unknown, fallback: string) {
    if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { error?: string } } }).response
        if (res?.data?.error) return res.data.error
    }
    if (err instanceof Error) return err.message
    return fallback
}

// Trae el detalle completo (correo + logs) del primer ticket pendiente
// de la empresa del jugador. Lo usa la Consola para tener algo que
// investigar con cat/grep.
export function useActividadPendiente() {
    const [actividad, setActividad] = useState<ActividadDetalleResponse | null>(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const cargar = useCallback(async () => {
        setCargando(true)
        setError(null)

        try {
            const jugador = JSON.parse(localStorage.getItem('jugador') ?? 'null')
            const empresaId = jugador?.empresaId as string | undefined

            if (!empresaId) {
                throw new Error('Todavía no iniciaste una partida')
            }

            const pendientes = await dashboardApi.listarActividades(empresaId, 'pendiente')

            if (!pendientes[0]) {
                setActividad(null)
                return
            }

            setActividad(await dashboardApi.obtenerDetalleActividad(pendientes[0]._id))
        } catch (err) {
            setError(extraerError(err, 'Error al cargar la actividad pendiente'))
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => {
        cargar()
    }, [cargar])

    return { actividad, cargando, error, recargar: cargar }
}
