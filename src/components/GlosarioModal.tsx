import { X, BookOpen } from 'lucide-react'
import { ARCHIVOS_LOG_INFO, GLOSARIO_TERMINOS } from '../data/glosarioLogs'

export default function GlosarioModal({ onCerrar }: { onCerrar: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
                <button
                    onClick={onCerrar}
                    className="absolute top-4 right-4 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
                    aria-label="Cerrar guía"
                >
                    <X className="size-5" />
                </button>

                <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-300">
                        <BookOpen className="size-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-100">Guía de logs</h2>
                </div>

                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                    <section>
                        <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-400 uppercase">Archivos</h3>
                        <ul className="space-y-2">
                            {ARCHIVOS_LOG_INFO.map((info) => (
                                <li key={info.archivo} className="flex items-baseline gap-2.5 rounded-md border border-slate-800 bg-slate-950/40 px-3.5 py-2.5">
                                    <span className="shrink-0 font-mono text-sm text-teal-300">{info.titulo}</span>
                                    <span className="text-sm text-slate-300">{info.descripcion}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-400 uppercase">Términos</h3>
                        <ul className="space-y-2">
                            {GLOSARIO_TERMINOS.map((t) => (
                                <li key={t.id} className="rounded-md border border-slate-800 bg-slate-950/40 px-3.5 py-2.5">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <span className="text-base font-medium text-slate-100">{t.termino}</span>
                                        <span className="shrink-0 text-xs text-slate-500">{t.dondeAparece}</span>
                                    </div>
                                    <p className="text-sm text-slate-300">{t.explicacion}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}
