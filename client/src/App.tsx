import { useState } from 'react'

import './App.css'
import type { MatchId } from './types';
import Home from './components/Home';
import MatchRoom from './components/MatchRoom';

function App() {
  const [selectedMatch, setSelectedMatch] = useState<MatchId | null>(null);

  if(selectedMatch === null){
    return <Home onSelectMatch={setSelectedMatch} />;
  }
  return (
    <MatchRoom
    matchId = {selectedMatch}
    onLeaveRoom={() => setSelectedMatch(null)}/>
  )
}

export default App
