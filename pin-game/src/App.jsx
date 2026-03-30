import { useState, useRef, useEffect } from 'react';
import NameEntry from './NameEntry';
import StarterSelector from './StarterSelector';
import WheelPage from './WheelPage';
import GamePage from './GamePage';
import { themes, defaultTheme } from './themes';

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [unlockedSection, setUnlockedSection] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const starterRef = useRef(null);
  const wheelRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    if (playerName !== null) {
      setTimeout(() => starterRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [playerName]);

  useEffect(() => {
    if (unlockedSection === 1) {
      setTimeout(() => wheelRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (unlockedSection === 2) {
      setTimeout(() => gameRef.current?.scrollIntoView({ behavior: 'smooth' }), 600);
    }
  }, [unlockedSection]);

  const theme = themes[selectedGroup] ?? defaultTheme;

  const handleStarterConfirm = () => setUnlockedSection(1);

  const handleWheelComplete = (winnerIndex) => {
    setSelectedChallenge(`c${winnerIndex + 1}`);
    setUnlockedSection(2);
  };

  return (
    <div>
      <section style={{ minHeight: '100vh' }}>
        <NameEntry onConfirm={setPlayerName} />
      </section>

      {playerName !== null && (
        <section ref={starterRef} style={{ minHeight: '100vh' }}>
          <StarterSelector
            playerName={playerName}
            selectedGroup={selectedGroup}
            onGroupSelect={setSelectedGroup}
            onConfirm={handleStarterConfirm}
          />
        </section>
      )}

      {unlockedSection >= 1 && selectedGroup && (
        <section ref={wheelRef} style={{ minHeight: '100vh' }}>
          <WheelPage group={selectedGroup} theme={theme} onComplete={handleWheelComplete} />
        </section>
      )}

      {unlockedSection >= 2 && selectedGroup && selectedChallenge && (
        <section ref={gameRef} style={{ minHeight: '100vh' }}>
          <GamePage group={selectedGroup} challenge={selectedChallenge} theme={theme} />
        </section>
      )}
    </div>
  );
}

export default App;
