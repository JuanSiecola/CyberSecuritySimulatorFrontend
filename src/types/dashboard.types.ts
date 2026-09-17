export type EstadoMetrica = 'bueno' | 'atencion' | 'critico'
export type NivelRiesgo = 'alto' | 'medio' | 'bajo'
export type AccionResolucion = 'ignorar' | 'reportar' | 'bloquear' | 'investigar'

export type MetricaProps = {
    label: string
    valor: number
    max?: number
    formatoMoneda?: boolean
    tendencia?: number // positivo, negativo o 0
    estado: EstadoMetrica
}

type ActividadEmail = {
    tipo: 'email'
    remitente: string
    destinatario: string
    contenido: string
    enlace?: string
}

type ActividadLogs = {
    tipo: 'logs'
    direccionIp: string
    ubicacion: string
    dispositivo: string
    usuario: string
    tipoAcceso: string
}

export type ActividadActual = {
    id: string
    descripcion: string
    nivelRiesgo: NivelRiesgo
} & (ActividadEmail | ActividadLogs)

export type Empresa = {
    _id: string
    seguridad: number
    reputacion: number
    dinero: number
    turno: number
    estado: 'activa' | 'derrota' | 'victoria'
}

export type ActividadResumen = {
    _id: string
    tipo: 'email' | 'logs'
    descripcion: string
    nivelRiesgo: number
    estado: 'pendiente' | 'resuelta' | 'ignorada'
    turno: number
}