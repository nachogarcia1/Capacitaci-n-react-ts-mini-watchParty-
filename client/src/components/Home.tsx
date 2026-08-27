import type {MatchId} from '../types'

interface HomeProps {
    onSelectMatch: (matchId: MatchId) => void;
}

function Home({onSelectMatch}: HomeProps) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold"> Elegí un partido</h1>

          <button onClick ={() => onSelectMatch("argentina-brasil")}
          className = "px-6 py-3 bg-blue-600 text-white rounded-lg hover: hover:bg-blue-700 transition-colors">
            Argentina vs Brasil
          </button>
          <button onClick ={() => onSelectMatch("boca-river")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Boca - River
          </button>

      </div>
    );
}

export default Home;