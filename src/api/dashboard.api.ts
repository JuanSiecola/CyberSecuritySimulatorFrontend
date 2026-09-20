import { axiosClient } from './axiosClient'
import type {
    Empresa,
    ActividadResumen,
    ActividadDetalleResponse,
    AccionResolucion,
    ResolverResultado,
    AvanzarResultado,
} from '../types/dashboard.types'

export async function crearEmpresa() {
    const { data } = await axiosClient.post<Empresa>('/empresas')
    return data
}

export async function obtenerEmpresa(empresaId: string) {
    const { data } = await axiosClient.get<Empresa>(`/empresas/${empresaId}`)
    return data
}

export async function listarActividades(empresaId: string, estado?: string) {
    const { data } = await axiosClient.get<ActividadResumen[] | { actividades: ActividadResumen[] }>(
        `/empresas/${empresaId}/actividades`,
        { params: estado ? { estado } : undefined }
    )
    return Array.isArray(data) ? data : data.actividades
}

export async function obtenerDetalleActividad(actividadId: string) {
    const { data } = await axiosClient.get<ActividadDetalleResponse>(`/actividades/${actividadId}`)
    return data
}

export async function resolverActividad(actividadId: string, accion: AccionResolucion) {
    const { data } = await axiosClient.post<ResolverResultado>(`/actividades/${actividadId}/resolver`, { accion })
    return data
}

export async function avanzarTurno(empresaId: string) {
    const { data } = await axiosClient.post<AvanzarResultado>(`/empresas/${empresaId}/avanzar`)
    return data
}

export async function rendirseEmpresa(empresaId: string) {
    const { data } = await axiosClient.post<{ empresa: Empresa }>(`/empresas/${empresaId}/rendirse`)
    return data
}
