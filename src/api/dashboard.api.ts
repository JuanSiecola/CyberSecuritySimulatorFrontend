import { axiosClient } from './axiosClient'
import type { Empresa, ActividadResumen } from '../types/dashboard.types'

export async function crearEmpresa() {
    const { data } = await axiosClient.post<Empresa>('/empresas')
    return data
}

export async function obtenerEmpresa(empresaId: string) {
    const { data } = await axiosClient.get<Empresa>(`/empresas/${empresaId}`)
    return data
}

export async function listarActividades(empresaId: string, estado?: string) {
    const { data } = await axiosClient.get<{ actividades: ActividadResumen[] }>(
        `/empresas/${empresaId}/actividades`,
        { params: estado ? { estado } : undefined }
    )
    return data.actividades
}

export async function obtenerDetalleActividad(actividadId: string) {
    const { data } = await axiosClient.get(`/actividades/${actividadId}`)
    return data
}

export async function resolverActividad(actividadId: string, accion: string) {
    const { data } = await axiosClient.post(`/actividades/${actividadId}/resolver`, { accion })
    return data
}