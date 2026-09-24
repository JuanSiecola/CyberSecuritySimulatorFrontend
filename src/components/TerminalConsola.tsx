import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { LogEntry } from '../types/dashboard.types'
import { ARCHIVOS_LOG_INFO, buscarEnGlosario, GLOSARIO_TERMINOS } from '../data/glosarioLogs'

type Linea = { tipo: 'comando' | 'salida' | 'sugerencia'; texto: string }

const AYUDA = [
    'Comandos:',
    '  ls                     lista los logs del ticket',
    '  cat <archivo>          muestra un log completo',
    '  grep <patron> [archivo]  busca un patrón',
    '  man <archivo>          qué es ese log (ej: man mail.log)',
    '  ayuda <termino>        explica un término (ej: ayuda spf)',
    '  clear                  limpia la pantalla',
]

function formatearLog(log: LogEntry) {
    const extras = [
        log.direccionIp && `ip=${log.direccionIp}`,
        log.usuario && `usuario=${log.usuario}`,
        log.tipoAcceso && `tipoAcceso=${log.tipoAcceso}`,
    ].filter(Boolean).join(' ')

    return `[${log.hora}] ${log.contenido}${extras ? '  (' + extras + ')' : ''}`
}

function coincide(log: LogEntry, patron: string) {
    const p = patron.toLowerCase()
    return [log.contenido, log.direccionIp, log.usuario, log.tipoAcceso]
        .filter((campo): campo is string => Boolean(campo))
        .some((campo) => campo.toLowerCase().includes(p))
}

function ejecutar(linea: string, logs: LogEntry[]): string[] | 'CLEAR' {
    const partes = linea.trim().split(/\s+/).filter(Boolean)
    const [comando, ...args] = partes

    if (!comando) return []

    switch (comando) {
        case 'help':
            return AYUDA

        case 'clear':
            return 'CLEAR'

        case 'ls': {
            const archivos = [...new Set(logs.map((log) => log.archivo))]
            return archivos.length ? archivos : ['No hay logs disponibles para este ticket.']
        }

        case 'cat': {
            const archivo = args[0]
            if (!archivo) return ['uso: cat <archivo>']
            const coincidencias = logs.filter((log) => log.archivo === archivo)
            if (!coincidencias.length) return [`cat: ${archivo}: no existe ese archivo`]
            return coincidencias.map(formatearLog)
        }

        case 'grep': {
            const [patron, archivo] = args
            if (!patron) return ['uso: grep <patron> [archivo]']
            const base = archivo ? logs.filter((log) => log.archivo === archivo) : logs
            if (archivo && !base.length) return [`grep: ${archivo}: no existe ese archivo`]
            const coincidencias = base.filter((log) => coincide(log, patron))
            return coincidencias.length ? coincidencias.map(formatearLog) : ['(sin coincidencias)']
        }

        case 'man': {
            const archivo = args[0]
            if (!archivo) return ['uso: man <archivo>  (ej: man mail.log)']
            const info = ARCHIVOS_LOG_INFO.find((a) => a.archivo === archivo)
            if (!info) return [`man: no existe "${archivo}"`, `Archivos: ${ARCHIVOS_LOG_INFO.map((a) => a.archivo).join(', ')}`]
            return [info.titulo, info.descripcion]
        }

        case 'ayuda': {
            const consulta = args.join(' ')
            if (!consulta) return ['uso: ayuda <termino>  (ej: ayuda spf)', GLOSARIO_TERMINOS.map((t) => t.id).join(', ')]
            const resultados = buscarEnGlosario(consulta)
            if (!resultados.length) return [`ayuda: no encontré "${consulta}". Probá "ayuda" sola.`]
            return resultados.flatMap((t) => [`${t.termino} (${t.dondeAparece}): ${t.explicacion}`])
        }

        default:
            return [`bash: ${comando}: comando no encontrado (probá "help")`]
    }
}

export default function TerminalConsola({ logs, pistaInicial }: { logs: LogEntry[]; pistaInicial?: string }) {
    const [historial, setHistorial] = useState<Linea[]>(() => {
        const inicial: Linea[] = [
            { tipo: 'salida', texto: 'SecureWay OS v1.0 — escribí "help" para ver los comandos.' },
        ]
        if (pistaInicial) inicial.push({ tipo: 'sugerencia', texto: pistaInicial })
        return inicial
    })
    const [entrada, setEntrada] = useState('')
    const [comandosPrevios, setComandosPrevios] = useState<string[]>([])
    const [indiceHistorial, setIndiceHistorial] = useState<number | null>(null)
    const finRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        finRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [historial])

    function alEnviar(e: FormEvent) {
        e.preventDefault()
        const linea = entrada
        if (!linea.trim()) return

        setComandosPrevios((prev) => [...prev, linea])
        setIndiceHistorial(null)

        const salida = ejecutar(linea, logs)

        if (salida === 'CLEAR') {
            setHistorial([])
        } else {
            setHistorial((prev) => [
                ...prev,
                { tipo: 'comando', texto: linea },
                ...salida.map((texto) => ({ tipo: 'salida' as const, texto })),
            ])
        }

        setEntrada('')
    }

    function alPresionarTecla(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (!comandosPrevios.length) return
            const nuevoIndice = indiceHistorial === null ? comandosPrevios.length - 1 : Math.max(0, indiceHistorial - 1)
            setIndiceHistorial(nuevoIndice)
            setEntrada(comandosPrevios[nuevoIndice])
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (indiceHistorial === null) return
            const nuevoIndice = indiceHistorial + 1
            if (nuevoIndice >= comandosPrevios.length) {
                setIndiceHistorial(null)
                setEntrada('')
            } else {
                setIndiceHistorial(nuevoIndice)
                setEntrada(comandosPrevios[nuevoIndice])
            }
        }
    }

    function claseLinea(tipo: Linea['tipo']) {
        if (tipo === 'comando') return 'text-slate-200'
        if (tipo === 'sugerencia') return 'whitespace-pre-wrap text-amber-300/90'
        return 'whitespace-pre-wrap text-emerald-400/90'
    }

    return (
        <div
            className="flex h-[60vh] flex-col rounded-lg border border-slate-800 bg-black font-mono text-sm text-emerald-400 shadow-inner"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-400">
                <span className="size-2.5 rounded-full bg-red-500/70" />
                <span className="size-2.5 rounded-full bg-amber-500/70" />
                <span className="size-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2">jugador@secureway:~$</span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
                {historial.map((linea, indice) => (
                    <div key={indice} className={claseLinea(linea.tipo)}>
                        {linea.tipo === 'comando' ? <>&gt; {linea.texto}</> : linea.tipo === 'sugerencia' ? <>» {linea.texto}</> : linea.texto}
                    </div>
                ))}
                <div ref={finRef} />
            </div>

            <form onSubmit={alEnviar} className="flex items-center gap-2 border-t border-slate-800 px-4 py-3">
                <span className="text-slate-500">$</span>
                <input
                    ref={inputRef}
                    value={entrada}
                    onChange={(e) => setEntrada(e.target.value)}
                    onKeyDown={alPresionarTecla}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
                    placeholder='escribí "help" para empezar'
                />
            </form>
        </div>
    )
}
