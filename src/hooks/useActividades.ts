import { useCallback, useEffect, useState } from 'react'
import * as dashboardApi from '../api/dashboard.api'
import type { ActividadResumen } from '../types/dashboard.types'

function extraerError(err: unknown, fallback: string) {
    if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { error?: string } } }).response
        if (res?.data?.error) return res.data.error
    }
    if (err instanceof Error) return err.message
    return fallback
}

export function useActividades() {
    const [actividades, setActividades] = useState<ActividadResumen[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const cargarActividades = useCallback(async () => {
        setCargando(true)
        setError(null)

        try {
            const jugador = JSON.parse(localStorage.getItem('jugador') ?? 'null')
            const empresaId = jugador?.empresaId as string | undefined

            if (!empresaId) {
                throw new Error('No se encontró la empresa de la partida')
            }

            setActividades(await dashboardApi.listarActividades(empresaId))
        } catch (err) {
            setError(extraerError(err, 'Error al cargar las actividades'))
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => {
        cargarActividades()
    }, [cargarActividades])

    return { actividades, cargando, error }
}