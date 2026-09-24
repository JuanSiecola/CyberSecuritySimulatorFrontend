import { useCallback, useEffect, useState } from 'react'

const CLAVE_STORAGE = 'secureway-onboarding-visto'

// Abre el onboarding solo la primera vez (nada guardado en localStorage).
// Despues queda disponible para reabrir a mano desde el boton "?" del header.
export function useOnboarding() {
    const [abierto, setAbierto] = useState(false)

    useEffect(() => {
        let visto = true
        try {
            visto = localStorage.getItem(CLAVE_STORAGE) === '1'
        } catch {
            visto = true
        }
        if (!visto) setAbierto(true)
    }, [])

    const cerrar = useCallback(() => {
        try {
            localStorage.setItem(CLAVE_STORAGE, '1')
        } catch {
            // localStorage no disponible: no bloquea el cierre del modal
        }
        setAbierto(false)
    }, [])

    const abrir = useCallback(() => setAbierto(true), [])

    return { abierto, abrir, cerrar }
}
