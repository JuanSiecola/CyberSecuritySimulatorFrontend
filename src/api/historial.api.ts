import { axiosClient } from './axiosClient'
import type { HistorialEntrada } from '../types/historial.types'

export async function obtenerRanking() {
    const { data } = await axiosClient.get<{ ranking: HistorialEntrada[] }>('/historial/ranking')
    return data.ranking
}
