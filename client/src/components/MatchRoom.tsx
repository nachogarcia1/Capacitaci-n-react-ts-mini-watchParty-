import type { MatchId } from '../types';

interface MatchRoomProps {
    matchId: MatchId;
    onLeaveRoom: () => void;
}

function MatchRoom({ matchId, onLeaveRoom }: MatchRoomProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Sala: {matchId}</h1>
            <button onClick={onLeaveRoom} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                Salir de la sala
            </button>
        </div>
    );
}

export default MatchRoom;