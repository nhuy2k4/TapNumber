import './App.css';
import GameInfo from './components/GameInfo';
import GameZone from './components/GameZone';
import NextPoint from './components/NextPoint';
import { useGameLogic } from './hooks/useGameLogic';
import { useAutoplay } from './hooks/useAutoplay';
import { GAME_STATES } from './utils/constants';
import GameTitle from './components/GameTitle';

function App() {
  const { gameData, gameActions } = useGameLogic();

  const {
    gameState,
    autoplay,
    points,
    time,
    expectedNumber,
    numbers,
    wrongValue,
    comboMessage,
    status,
    hardMode, 
  } = gameData;

  const {
    setAutoplay,
    setPoints,
    setStatus,
    handleClick,
    restartGame,
    setHardMode, 
  } = gameActions;

  useAutoplay(autoplay, gameState, numbers, expectedNumber, handleClick);

  const gameInfoData = {
    points,
    setPoints,
    time,
    status,
    setStatus,
    autoplay,
    toggleAutoplay: () => setAutoplay(prev => !prev),
    onRestart: restartGame,
    gameState,
    hardMode,
    setHardMode,
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-8 bg-gray-50">
      <div className="flex flex-col items-start px-4 text-left">
        <GameTitle gameState={gameState} />
        <GameInfo gameData={gameInfoData} />
      </div>
      <div className="flex flex-col items-center">
        <GameZone
          numbers={numbers}
          wrongValue={wrongValue}
          onClickNumber={handleClick}
          gameState={gameState}
          comboMessage={comboMessage}
          hardMode={hardMode} 
        />
        <NextPoint value={expectedNumber} gameState={gameState} />
      </div>
    </div>
  );
}

export default App;
