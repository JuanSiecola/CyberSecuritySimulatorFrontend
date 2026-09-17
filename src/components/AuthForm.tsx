import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Campo = {
    label: string;
    type: string;
    value: string;
    onChange: (v: string) => void; minLength?: number
}

type Props = {
    titulo: string
    campos: Campo[]
    error: string | null
    cargando: boolean
    textoBoton: string
    onSubmit: () => void
    footer: ReactNode
}

export default function AuthForm({ titulo, campos, error, cargando, textoBoton, onSubmit, footer }: Props) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.09),transparent_34%)]" />

            <h1 className="relative mb-8 text-3xl font-semibold tracking-[-0.03em] text-slate-100">
                Secure<span className="text-emerald-400">Way</span>
            </h1>

            <Card className="relative w-full max-w-sm overflow-hidden rounded-2xl border-slate-800/80 bg-slate-900/95 text-slate-100 shadow-2xl shadow-black/30 ring-1 ring-white/5 backdrop-blur">
                <div className="h-1 w-full bg-emerald-500" />
                <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
                    <CardHeader className="gap-2 border-b border-slate-800/80 pb-5">
                        <CardTitle className="text-xl font-semibold tracking-tight text-slate-100">{titulo}</CardTitle>
                    </CardHeader>

                    <CardContent className="gap-5 pt-6">
                        {error && (
                            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-sm leading-5 text-red-400">
                                {error}
                            </p>
                        )}

                        {campos.map((campo) => (
                            <div key={campo.label} className="flex flex-col gap-2">
                                <Label className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
                                    {campo.label}
                                </Label>
                                <Input
                                    type={campo.type}
                                    value={campo.value}
                                    onChange={(e) => campo.onChange(e.target.value)}
                                    required
                                    minLength={campo.minLength}
                                    className="h-11 rounded-lg border-slate-800 bg-slate-950/80 px-3.5 text-slate-100 placeholder:text-slate-600 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
                                />
                            </div>
                        ))}

                        <Button
                            type="submit"
                            disabled={cargando}
                            className="mt-1 h-11 rounded-lg bg-emerald-500 font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition-transform hover:bg-emerald-400 hover:shadow-emerald-900/30 active:translate-y-px"
                        >
                            {cargando ? 'Cargando...' : textoBoton}
                        </Button>

                        <div className="border-t border-slate-800/80 pt-5">
                            {footer}
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    )
}