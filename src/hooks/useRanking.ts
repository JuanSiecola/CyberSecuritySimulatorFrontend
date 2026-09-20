import { useCallback, useEffect, useState } from 'react'
import * as historialApi from '../api/historial.api'
import type { HistorialEntrada } from '../types/historial.types'

function extraerError(err: unknown, fallback: string) {
    if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { error?: string } } }).response
        if (res?.data?.error) return res.data.error
    }
    if (err instanceof Error) return err.message
    return fallback
}

export function useRanking() {
    const [ranking, setRanking] = useState<HistorialEntrada[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const cargar = useCallback(async () => {
        setCargando(true)
        setError(null)
        try {
            setRanking(await historialApi.obtenerRanking())
        } catch (err) {
            setError(extraerError(err, 'Error al cargar el historial'))
        } finally {
            setCargando(false)
        }
    }, [])

    useEffect(() => {
        cargar()
    }, [cargar])

    return { ranking, cargando, error }
}
