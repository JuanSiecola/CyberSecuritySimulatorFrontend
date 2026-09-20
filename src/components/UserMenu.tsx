import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

type Props = {
    nombre: string
    email?: string
    iniciales: string
}

export default function UserMenu({ nombre, email, iniciales }: Props) {
    const [abierto, setAbierto] = useState(false)
    const contenedor = useRef<HTMLDivElement>(null)
    const { cerrarSesion } = useAuth()

    useEffect(() => {
        if (!abierto) return

        function alHacerClick(e: MouseEvent) {
            if (!contenedor.current?.contains(e.target as Node)) setAbierto(false)
        }
        function alPresionarTecla(e: KeyboardEvent) {
            if (e.key === 'Escape') setAbierto(false)
        }

        document.addEventListener('mousedown', alHacerClick)
        document.addEventListener('keydown', alPresionarTecla)
        return () => {
            document.removeEventListener('mousedown', alHacerClick)
            document.removeEventListener('keydown', alPresionarTecla)
        }
    }, [abierto])

    return (
        <div ref={contenedor} className="relative border-l border-slate-800 pl-4">
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={abierto}
                onClick={() => setAbierto((valor) => !valor)}
                className="flex items-center gap-2 rounded-md px-1.5 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-slate-200"
            >
                <span className="flex size-8 items-center justify-center rounded-full bg-slate-700 text-[11px] text-slate-200">{iniciales}</span>
                <strong className="hidden text-slate-200 lg:block">{nombre}</strong>
                <ChevronDown className={`size-4 transition-transform ${abierto ? 'rotate-180' : ''}`} />
            </button>

            {abierto && (
                <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-slate-800 bg-slate-900 p-1 shadow-lg shadow-black/30">
                    <div className="px-3 py-2">
                        <p className="truncate text-sm font-medium text-slate-100">{nombre}</p>
                        {email && <p className="truncate text-xs text-slate-500">{email}</p>}
                    </div>
                    <div className="my-1 h-px bg-slate-800" />
                    <button
                        type="button"
                        role="menuitem"
                        onClick={cerrarSesion}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="size-4" />
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    )
}
