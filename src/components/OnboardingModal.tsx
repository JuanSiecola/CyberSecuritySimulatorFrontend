import { useState, type ReactNode } from 'react'
import { X, ArrowLeft, ArrowRight, ShieldQuestion, TerminalSquare, BookOpen, Play } from 'lucide-react'
import { Button } from './ui/button'
import TerminalConsola from './TerminalConsola'
import { ARCHIVOS_LOG_INFO } from '../data/glosarioLogs'
import type { LogEntry } from '../types/dashboard.types'

const LOGS_DEMO: LogEntry[] = [
    {
        archivo: 'mail.log',
        hora: '09:15:00',
        contenido: 'Correo de facturas@banco-segura.net. Falló la verificación SPF.',
        direccionIp: '203.0.113.9',
        usuario: 'demo',
        tipoAcceso: 'smtp',
    },
    {
        archivo: 'proxy.log',
        hora: '09:16:40',
        contenido: 'demo entró al enlace. El dominio se creó hace 1 día.',
        direccionIp: '10.0.0.5',
        usuario: 'demo',
        tipoAcceso: 'http',
    },
]

type Paso = { icono: typeof ShieldQuestion; titulo: string; contenido: ReactNode }

const PASOS: Paso[] = [
    {
        icono: ShieldQuestion,
        titulo: 'Sos el analista',
        contenido: (
            <>
                <p>Cada turno llega un ticket: un correo sospechoso.</p>
                <p>Vos decidís: <strong className="text-red-300">Bloquear</strong> o <strong className="text-emerald-300">Permitir</strong>.</p>
                <p className="text-slate-400">Cuidá 3 métricas: Seguridad, Reputación, Dinero. Si una llega a 0, perdés.</p>
            </>
        ),
    },
    {
        icono: TerminalSquare,
        titulo: 'El correo no alcanza',
        contenido: (
            <>
                <p>Andá a <strong className="text-teal-300">Consola</strong> y revisá los logs con comandos tipo Linux.</p>
                <p className="text-slate-400">mail · auth · proxy · sandbox</p>
                <p className="text-slate-400">¿Un término no se entiende? Escribí <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-teal-200">man &lt;archivo&gt;</code> o <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-teal-200">ayuda &lt;termino&gt;</code> en la consola.</p>
            </>
        ),
    },
    {
        icono: Play,
        titulo: 'Probá acá mismo',
        contenido: (
            <>
                <p className="mb-3">Esto no cuenta para tu partida. Escribí:</p>
                <p className="mb-3 flex flex-wrap gap-2">
                    <code className="rounded bg-slate-800 px-2 py-1 text-sm text-emerald-300">ls</code>
                    <code className="rounded bg-slate-800 px-2 py-1 text-sm text-emerald-300">cat mail.log</code>
                    <code className="rounded bg-slate-800 px-2 py-1 text-sm text-emerald-300">grep spf</code>
                </p>
                <TerminalConsola logs={LOGS_DEMO} />
            </>
        ),
    },
    {
        icono: BookOpen,
        titulo: '4 tipos de log',
        contenido: (
            <>
                <ul className="space-y-2">
                    {ARCHIVOS_LOG_INFO.map((info) => (
                        <li key={info.archivo} className="flex items-baseline gap-2.5 rounded-md border border-slate-800 bg-slate-950/40 px-3.5 py-2.5">
                            <span className="shrink-0 font-mono text-sm text-teal-300">{info.titulo}</span>
                            <span className="text-sm text-slate-300">{info.descripcion}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 text-sm text-slate-400">
                    Reabrí esta guía con <span className="rounded bg-slate-800 px-1.5 py-0.5">?</span>, o usá <code className="rounded bg-slate-800 px-1.5 py-0.5 text-teal-200">man</code> / <code className="rounded bg-slate-800 px-1.5 py-0.5 text-teal-200">ayuda</code> en la Consola.
                </p>
            </>
        ),
    },
]

export default function OnboardingModal({ onCerrar }: { onCerrar: () => void }) {
    const [paso, setPaso] = useState(0)
    const esUltimo = paso === PASOS.length - 1
    const { icono: Icono, titulo, contenido } = PASOS[paso]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
                <button
                    onClick={onCerrar}
                    className="absolute top-4 right-4 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
                    aria-label="Cerrar guía"
                >
                    <X className="size-5" />
                </button>

                <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-300">
                        <Icono className="size-5" />
                    </div>
                    <h2 className="pr-8 text-xl font-semibold text-slate-100">{titulo}</h2>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 text-base leading-relaxed text-slate-200 [&>p]:mb-2.5">
                    {contenido}
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-800 px-6 py-4">
                    <div className="flex gap-1.5">
                        {PASOS.map((_, i) => (
                            <span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === paso ? 'bg-teal-300' : 'bg-slate-700'}`} />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {paso > 0 && (
                            <Button variant="outline" size="sm" className="rounded-full" onClick={() => setPaso((p) => p - 1)}>
                                <ArrowLeft className="size-3.5" /> Atrás
                            </Button>
                        )}
                        {esUltimo ? (
                            <Button size="sm" className="rounded-full font-semibold" onClick={onCerrar}>
                                <Play className="size-3.5" /> Empezar
                            </Button>
                        ) : (
                            <Button size="sm" className="rounded-full" onClick={() => setPaso((p) => p + 1)}>
                                Siguiente <ArrowRight className="size-3.5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
