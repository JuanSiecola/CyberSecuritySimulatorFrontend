export type Jugador = {
    _id: string;
    nombre: string;
    email: string;
    empresaId: string | null;
}
export type AuthResponse = {
    jugador: Jugador;
    token: string
}