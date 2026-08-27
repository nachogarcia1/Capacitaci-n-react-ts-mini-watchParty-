import { useEffect, useRef, useState } from "react";
import type {MatchId, ChatMessage, JoinRoomEvent, ChatMessageEvent} from '../types'

function useWebSocket(matchId: MatchId, username: string){
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')
        socketRef.current = socket;

        socket.onopen = () => {
            const joinEvent: JoinRoomEvent = {
                type: "JOIN_ROOM",
                matchId: matchId,
                username: username,
            };

            socket.send(JSON.stringify(joinEvent));
        }

        socket.onmessage = (event) => { //cuando recibe un mensaje de alguien mas

            try{
                const data = JSON.parse(event.data);
                switch(data.type) {
                    case "CHAT_MESSAGE": {
                        setMessages((prev) => [...prev, data as ChatMessage]);
                        break;
                    }

                    default: console.warn('Tipo de mensaje desconocido:', data.type);
                }
            }
            catch {
                console.error("Mensaje mal formado, se ignora");
                return;
            }
        }
        return () => {
            socket.close();
        }
    },[])

    function sendMessage(message: string) {
        if (!socketRef.current) return;

        const chatMessageEvent: ChatMessageEvent = {
            type: "CHAT_MESSAGE",
            matchId,
            message,
        };
        socketRef.current.send(JSON.stringify(chatMessageEvent));
    }

    return { messages, sendMessage };
}

export default useWebSocket;