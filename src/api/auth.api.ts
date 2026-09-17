import { axiosClient } from './axiosClient'
import type { AuthResponse } from '../types/auth.types'

export async function login(email: string, password: string) {
    const { data } = await axiosClient.post<AuthResponse>('/jugadores/login', { email, password })
    return data
}

export async function registrar(nombre: string, email: string, password: string) {
    const { data } = await axiosClient.post<AuthResponse>('/jugadores/registro', { nombre, email, password })
    return data
}

export async function logout() {
    await axiosClient.post('/jugadores/logout')
}