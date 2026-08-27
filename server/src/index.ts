
import WebSocket, { WebSocketServer } from 'ws';
import {ChatMessage, ChatMessageEvent, JoinRoomEvent, MatchId, ClientEvent} from './types';
import {randomUUID} from "node:crypto";


const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
const connectionState = new Map<WebSocket, { matchId: MatchId; username: string }>();
const VALID_MATCH_IDS: MatchId[] = ['boca-river', 'argentina-brasil']; //mega magico, pero es una limitación de ts, no existen tipos en runtime

console.log("Server started, listening on port " + PORT);

wss.on("connection", (ws) => { //evento a nivel servidor wss -> es el server, ws es una coneccion de ese server
    console.log("New client connected");

    ws.on("message", (raw) => {

        try{

        const event = JSON.parse(raw.toString()) as ClientEvent;

        if (!VALID_MATCH_IDS.includes(event.matchId)) {
            console.log(`Sala inválida recibida: ${event.matchId}`);
            return;
        }

        switch (event.type) {
            case "JOIN_ROOM":{
                connectionState.set(ws, { matchId: event.matchId, username: event.username }); //lo agrego a mi mapa de conexiones
                console.log(`${event.username} joined game: ${event.matchId}`); //logueo
                break; //termina
            }
            case "CHAT_MESSAGE":{
                const senderState = connectionState.get(ws); // obtengo ws correspondiente al cliente que esta tratando de enviar el mensaje
                if (!senderState) {
                    return;
                }
                const message: ChatMessage = { // creo el chatMessage a partir del event obtenido y el senderstate. Hace falta hacer un guard check pq sino el username es undefined. (no se unio nunca a la sala)
                    type: "CHAT_MESSAGE",
                    id: randomUUID(),
                    message: event.message,
                    matchId: senderState.matchId,
                    sender: senderState.username,
                    timestamp: Date.now(),
                };

                wss.clients.forEach((client) => { // wss.clients es un set con todas las conexiones websockets activas en el servidor, y a cada cliente en donde
                    const clientState = connectionState.get(client); //obtenes el valor del ws

                    if (clientState && clientState.matchId === senderState.matchId && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(message));

                    }

                });
            }
        }
        }
        catch(error){
            console.error("Error procesando mensaje:", error);
        }

    })



    ws.on("close", () => { //evento a coneccion particular ws -> particular
        connectionState.delete(ws);
        console.log("Client disconnected");
    })
})

