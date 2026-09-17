import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/auth.api'

function extraerError(err: unknown, fallback: string) {
    if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { error?: string } } }).response
        return res?.data?.error ?? fallback
    }
    return fallback
}

export function useAuth() {
    const [error, setError] = useState<string | null>(null)
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    async function iniciarSesion(email: string, password: string) {
        setError(null)
        setCargando(true)
        try {
            const { token, jugador } = await authApi.login(email, password)
            localStorage.setItem('token', token)
            localStorage.setItem('jugador', JSON.stringify(jugador))
            navigate('/dashboard')
        } catch (err) {
            setError(extraerError(err, 'Error al iniciar sesión'))
        } finally {
            setCargando(false)
        }
    }

    async function registrarse(nombre: string, email: string, password: string) {
        setError(null)
        setCargando(true)
        try {
            const { token, jugador } = await authApi.registrar(nombre, email, password)
            localStorage.setItem('token', token)
            localStorage.setItem('jugador', JSON.stringify(jugador))
            navigate('/dashboard')
        } catch (err) {
            setError(extraerError(err, 'Error al registrarse'))
        } finally {
            setCargando(false)
        }
    }

    return { iniciarSesion, registrarse, error, cargando }
}