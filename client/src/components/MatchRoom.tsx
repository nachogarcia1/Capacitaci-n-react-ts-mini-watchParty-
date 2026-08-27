import type { MatchId } from '../types';
import { useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';


interface MatchRoomProps {
    matchId: MatchId;
    onLeaveRoom: () => void;
}

function MatchRoom({ matchId, onLeaveRoom }: MatchRoomProps) {

    const [username] = useState(() => `Fan_${Math.floor(Math.random() * 1000)}`);
    const { messages, sendMessage } = useWebSocket(matchId, username);
    const [inputText, setInputText] = useState('');

    function handleSend(message: string) {
        if (!message.trim()) return; //si son solo espacios, no vale el mensaje
        sendMessage(message);
        setInputText('');
    }

    return (
        <div className="match-room">
            <header className="bg-blue-700 text-white">
                <h2>Sala del partido</h2>
            </header>


            <ul className="chat_messages">
                {messages.map((msg) => (
                    <li key = {msg.id}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </li>
                ))}
            </ul>


            <div className = "messageInput">
                <input
                type = "text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribí un comentario..."
                />
                <button onClick={() => handleSend(inputText)}>Enviar</button>
            </div>
        </div>
    );
}

export default MatchRoom;