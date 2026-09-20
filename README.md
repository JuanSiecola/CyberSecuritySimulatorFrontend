# SecureWay — Frontend

Interfaz web de **SecureWay**, un juego de entrenamiento en ciberseguridad. El jugador se pone en el lugar de un analista de seguridad: revisa correos reportados, investiga la evidencia (logs) desde una consola y decide si bloquear o permitir cada actividad, tratando de mantener la seguridad, la reputación y el dinero de la empresa a lo largo de varios turnos.

Este repositorio es solo el frontend. Necesita el backend corriendo aparte.

## Integrantes

- Camilo Fagúndez
- Iñaki Clara
- Juan Siécola

## Tecnologías

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui (estilo "base-vega") sobre Base UI
- react-router-dom v7
- Axios

## Requisitos previos

- Node.js 18 o superior
- El backend corriendo (por defecto en `http://localhost:3000`), con las plantillas de tickets ya sembradas (`npm run seed` en el backend)

## Puesta en marcha

```bash
git clone <url-del-repo>
cd CyberSecuritySimulatorFrontend
npm install
cp .env.example .env
npm run dev
```

La app queda disponible en `http://localhost:5173` (o el puerto que indique Vite).

### Variables de entorno

| Variable       | Descripción          | Valor por defecto       |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | URL base del backend | `http://localhost:3000` |

## Scripts disponibles

| Comando           | Qué hace                                                 |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Levanta el servidor de desarrollo con hot reload         |
| `npm run build`   | Chequea tipos (`tsc -b`) y genera el build de producción |
| `npm run preview` | Sirve el build de producción localmente                  |
| `npm run lint`    | Corre Oxlint sobre el código                             |

## Estructura del proyecto

```
src/
├── api/            # Llamadas HTTP al backend (axios), un archivo por recurso
├── components/      # Componentes de UI, incluye components/ui (shadcn)
├── hooks/            # Lógica de estado y llamadas a la API por pantalla
├── pages/            # Una página por ruta
├── types/            # Tipos TypeScript que reflejan el contrato del backend
├── routes.tsx        # Definición de rutas
└── index.css         # Tokens de tema (Tailwind v4) y animaciones
```

## Rutas

| Ruta         | Página          | Descripción                                                                                     |
| ------------ | --------------- | ----------------------------------------------------------------------------------------------- |
| `/login`     | `LoginPage`     | Inicio de sesión                                                                                |
| `/registro`  | `RegisterPage`  | Registro de un jugador nuevo                                                                    |
| `/dashboard` | `DashboardPage` | Resumen de la partida: métricas, actividad actual, cola de pendientes, avanzar turno o rendirse |
| `/actividad` | `ActividadPage` | Listado histórico de actividades de la partida                                                  |
| `/consola`   | `ConsolaPage`   | Terminal interactiva para investigar los logs del ticket pendiente (`ls`, `cat`, `grep`)        |
| `/historial` | `HistorialPage` | Ranking global de partidas finalizadas                                                          |

Todas las rutas salvo `/login` y `/registro` están protegidas por `ProtectedRoute` (requieren token) y envueltas en `DashboardLayout` (sidebar + header).

## Cómo funciona el juego (resumen desde el frontend)

1. Al entrar por primera vez a `/dashboard`, si el jugador no tiene una empresa asociada, se crea una automáticamente (`POST /empresas`).
2. Cada turno trae **una** actividad pendiente (un correo reportado). El jugador puede:
   - Leer el correo (asunto, remitente, destinatario, enlace si tiene, y el cuerpo) en la tarjeta de actividad actual.
   - Ir a **Consola** para investigar los logs de evidencia del mismo ticket con comandos tipo terminal, y decidir con eso si el correo es malicioso o no. Los logs **no** se muestran en la tarjeta del correo a propósito: hay que ir a buscarlos.
   - Resolver la actividad como **Bloquear** o **Permitir**.
3. Cuando no quedan actividades pendientes, aparece el botón para avanzar de turno.
4. La partida termina en **Victoria** (se llega al último turno) o **Derrota** (alguna métrica llega a 0, o el jugador se rinde). En ese momento aparece una ventana emergente con el resultado y tres opciones: reiniciar partida, ver el historial/ranking, o terminar (cierra sesión).

## Notas

- El contrato de datos de un ticket es siempre `correo` + `logs` juntos (no es una unión discriminada por `tipo`); ver `src/types/dashboard.types.ts` para el detalle exacto de los campos.
- Los estilos de shadcn/ui dependen de las variables CSS definidas en `src/index.css` (`:root` + `@theme inline`); si un componente nuevo de shadcn se ve "sin estilo", revisar que sus tokens estén ahí.
