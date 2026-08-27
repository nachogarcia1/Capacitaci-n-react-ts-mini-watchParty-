export type MatchId = 'boca-river' | 'argentina-brasil'

export interface JoinRoomEvent{
    type: "JOIN_ROOM";
    matchId: MatchId;
    username: string
}
export interface ChatMessageEvent{
    type: "CHAT_MESSAGE";
    matchId: MatchId;
    message: string;
}

export interface ChatMessage{
    type: "CHAT_MESSAGE"; //dejo lugar a que hayan otros tipos de mensajes
    id: string
    message: string;
    matchId: MatchId;
    sender: string;
    timestamp: number;
}

export interface UserJoinedMessage {
    type: "USER_JOINED";
    matchId: MatchId;
    username: string;
}

type SocketMessage = ChatMessage | UserJoinedMessage;

export type ClientEvent = JoinRoomEvent | ChatMessageEvent;