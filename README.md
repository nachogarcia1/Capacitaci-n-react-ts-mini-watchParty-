# Mini WatchParty — Capacitación React + TypeScript

Práctica de una sala de chat en tiempo real por partido, usando WebSockets, como ejercicio previo al desarrollo del MVP de WatchParty (Laboratorio IV).

## Stack

**Cliente**
- React + TypeScript
- Vite
- Tailwind CSS

**Servidor**
- Node.js + TypeScript
- [`ws`](https://github.com/websockets/ws) (WebSocket server, sin frameworks adicionales)
- `tsx` para desarrollo con recarga en caliente

## Estructura del proyecto

```
.
├── client/          # Frontend (React + Vite + Tailwind)
│   └── src/
│       ├── Home.tsx           # Selección de partido
│       ├── MatchRoom.tsx      # Sala de chat del partido
│       ├── hooks/
│       │   └── useWebSocket.ts
│       └── types.ts
└── server/          # Backend (Node + ws)
    └── src/
        ├── index.ts           # Servidor WebSocket
        └── types.ts
```

## Cómo correr el proyecto

Se necesitan dos terminales, una para el cliente y otra para el servidor.

**Servidor** (queda escuchando en `ws://localhost:8080`):
```
cd server
npm install
npm run dev
```

**Cliente**:
```
cd client
npm install
npm run dev
```

## Funcionalidades implementadas

- Selección de partido desde una pantalla inicial (`Home`).
- Sala de chat en tiempo real por partido (`MatchRoom`), usando WebSockets.
- El servidor agrupa las conexiones por `matchId` y solo retransmite los mensajes a los clientes conectados a esa misma sala.
- Validación de salas: el servidor rechaza mensajes con un `matchId` que no existe.
- Manejo de errores: tanto cliente como servidor ignoran mensajes mal formados sin caerse.

## Protocolo de WebSocket

Los mensajes viajan como JSON con un campo `type` que identifica el evento (unión discriminada).

**Cliente → Servidor** (`ClientEvent`):
| Tipo | Campos | Descripción |
|---|---|---|
| `JOIN_ROOM` | `matchId`, `username` | Se envía al conectar, para unirse a la sala del partido. |
| `CHAT_MESSAGE` | `matchId`, `message` | Un mensaje de chat nuevo. |

**Servidor → Cliente** (`ChatMessage`):
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Generado por el servidor (`randomUUID()`). |
| `message` | `string` | Contenido del mensaje. |
| `matchId` | `MatchId` | Sala a la que pertenece. |
| `sender` | `string` | Username, tomado de la conexión (no confiado del cliente). |
| `timestamp` | `number` | Generado por el servidor. |

## Limitaciones conocidas / próximos pasos

- Los mensajes viven solo en memoria del servidor — se pierden al reiniciarlo (no hay persistencia todavía).
- El `username` es generado al azar en el cliente (`Fan_XXX`), no hay autenticación real.
- No hay reacciones a comentarios ni historial de partidos vistos todavía (fuera del alcance de esta práctica puntual).