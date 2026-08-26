type MatchId = 'boca-river' | 'argentina-brasil'

interface JoinRoomEvent{
    type: "JOIN_ROOM";
    matchId: MatchId;
    username: string
}
interface ChatMessageEvent{
    type: "CHAT_MESSAGE";
    matchId: MatchId;
    message: string;
}

interface ChatMessage{
    type: "CHAT_MESSAGE"; //dejo lugar a que hayan otros tipos de mensajes
    message: string;
    matchId: MatchId;
    sender: string;
    timestamp: number;
}

type ClientEvent = JoinRoomEvent | ChatMessageEvent;