import { ArrowRight, Crosshair, LockKeyhole, Radar, ShieldCheck, Terminal, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

const briefingSteps = [
    { number: '01', title: 'Detectá', description: 'Analizá las señales y encontrá la amenaza antes de que avance.', icon: Radar },
    { number: '02', title: 'Decidí', description: 'Elegí la respuesta correcta con información limitada y tiempo real.', icon: Crosshair },
    { number: '03', title: 'Protegé', description: 'Contené el incidente y medí el impacto de cada decisión.', icon: ShieldCheck },
]

export default function WelcomePage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#07110f] text-slate-100">
            <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(94,234,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
            <div className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full border border-emerald-300/10 bg-emerald-300/[0.03]" />
            <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
                <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight"><span className="flex size-9 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 text-emerald-300"><LockKeyhole className="size-4" /></span>Secure<span className="text-emerald-300">Way</span></Link>
                <Link to="/login" className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-emerald-300">Ya tengo una cuenta <ArrowRight className="size-4" /></Link>
            </nav>
            <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-28 lg:pt-20">
                <div className="max-w-2xl">
                    <div className="mb-7 inline-flex items-center gap-2 border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300"><span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />Centro de entrenamiento activo</div>
                    <p className="mb-4 font-mono text-sm uppercase tracking-[0.28em] text-cyan-300/80">Protocolo de incorporación // 001</p>
                    <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">Tu primera línea de defensa empieza <span className="text-emerald-300">acá.</span></h1>
                    <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">Bienvenido, analista. SecureWay es un simulador de incidentes donde cada alerta exige criterio, velocidad y una respuesta precisa.</p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/registro" className="group inline-flex items-center justify-center gap-3 bg-emerald-300 px-5 py-3.5 text-sm font-semibold text-[#06201a] transition-colors hover:bg-emerald-200">Comenzar entrenamiento <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link><Link to="/login" className="inline-flex items-center justify-center gap-3 border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-300/50 hover:text-emerald-300"><UserRound className="size-4" />Ingresar</Link></div>
                </div>
                <div className="relative mx-auto w-full max-w-lg"><div className="absolute -inset-5 border border-emerald-300/10" /><div className="relative border border-slate-700/80 bg-[#0b1b18]/95 p-5 shadow-2xl shadow-emerald-950/30 sm:p-7">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-5"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-300"><Terminal className="size-5" /></div><div><p className="font-mono text-xs uppercase tracking-widest text-slate-500">Simulación</p><p className="mt-1 text-sm font-medium text-slate-100">Operación: Punto Ciego</p></div></div><span className="font-mono text-xs text-emerald-300">ONLINE</span></div>
                    <div className="space-y-5 py-6"><div className="flex items-start gap-3 font-mono text-xs leading-6 text-slate-400"><span className="text-emerald-300">$</span><p>iniciar protocolo de análisis<br /><span className="text-slate-600">cargando contexto de red...</span></p></div><div className="border-l border-amber-300/40 pl-4"><p className="text-xs uppercase tracking-widest text-amber-300">Alerta prioritaria</p><p className="mt-2 text-sm leading-6 text-slate-300">Se detectó una actividad anómala en un dispositivo interno. Tu evaluación es necesaria.</p></div><div className="grid grid-cols-2 gap-3"><div className="border border-slate-800 bg-slate-950/50 p-3"><p className="font-mono text-[11px] uppercase text-slate-500">Riesgo</p><p className="mt-2 text-lg font-semibold text-amber-300">Medio</p></div><div className="border border-slate-800 bg-slate-950/50 p-3"><p className="font-mono text-[11px] uppercase text-slate-500">Tiempo</p><p className="mt-2 text-lg font-semibold text-cyan-300">04:32</p></div></div></div>
                    <div className="flex items-center justify-between border-t border-slate-800 pt-5 font-mono text-[11px] uppercase tracking-widest text-slate-500"><span>Analista no asignado</span><span className="text-emerald-300">Esperando ingreso</span></div>
                </div></div>
            </section>
            <section className="relative border-t border-slate-800/80 bg-[#091512]/70"><div className="mx-auto max-w-7xl px-6 py-14 lg:px-10"><div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-300">Tu misión</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Pensar como analista.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">Aprendé haciendo. Las decisiones que tomes van a definir el resultado de cada partida.</p></div><div className="grid gap-px overflow-hidden border border-slate-800 bg-slate-800 md:grid-cols-3">{briefingSteps.map(({ number, title, description, icon: Icon }) => <article key={number} className="bg-[#091512] p-6 transition-colors hover:bg-[#0d211c]"><div className="flex items-center justify-between"><Icon className="size-5 text-emerald-300" /><span className="font-mono text-xs text-slate-600">{number}</span></div><h3 className="mt-8 text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></article>)}</div></div></section>
        </main>
    )
}
