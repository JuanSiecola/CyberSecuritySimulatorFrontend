export type EstadoMetrica = 'bueno' | 'atencion' | 'critico'
export type NivelRiesgo = 'alto' | 'medio' | 'bajo'
export type AccionResolucion = 'bloquear' | 'permitir'
export type EstadoActividad = 'pendiente' | 'resuelta' | 'ignorada'

export type MetricaProps = {
    label: string
    valor: number
    max?: number
    formatoMoneda?: boolean
    tendencia?: number // positivo, negativo o 0
    estado: EstadoMetrica
}

// Un log de evidencia (mail.log, auth.log, etc). El backend exige al
// menos un log por ticket y valida el nombre de archivo, pero los
// campos varían según el tipo de log, así que van opcionales.
export type LogEntry = {
    archivo: string
    hora: string
    contenido: string
    direccionIp?: string
    usuario?: string
    tipoAcceso?: string
}

export type Correo = {
    titulo: string
    remitente: string
    destinatario: string
    contenido: string
    tieneAdjunto?: boolean
    enlace?: string
}

// El backend siempre manda correo + logs juntos en cada ticket
// (nunca uno u otro): no es una unión discriminada por "tipo".
type ContenidoTicket = {
    correo: Correo
    logs: LogEntry[]
}

export type ActividadActual = {
    id: string
    descripcion: string
    nivelRiesgo: NivelRiesgo
} & ContenidoTicket

export type Empresa = {
    _id: string
    seguridad: number
    reputacion: number
    dinero: number
    turno: number
    maxTurnos: number
    estado: 'activa' | 'derrota' | 'victoria'
}

// Campos comunes a la lista y al detalle de un ticket.
type TicketBase = {
    _id: string
    descripcion: string
    nivelRiesgo: number
    estado: EstadoActividad
    turno: number
    esMalicioso?: boolean
} & ContenidoTicket

export type ActividadResumen = TicketBase

export type ActividadDetalleResponse = TicketBase

export type ImpactoResolucion = {
    seguridad: number
    reputacion: number
    dinero: number
}

export type ResolverResultado = {
    actividad: ActividadDetalleResponse
    empresa: Empresa
    correcta: boolean
    esMaliciosa: boolean
    impacto: ImpactoResolucion
}

export type AvanzarResultado = {
    empresa: Empresa
    actividades: ActividadDetalleResponse[]
    pendientesPenalizadas: number
}
