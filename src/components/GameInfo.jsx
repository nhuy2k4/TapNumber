import Points from "./Points";
import Timer from "./Timer";
import GameButton from "./GameButton";

const GameInfo = ({ gameData }) => {
  const {
    points,
    setPoints,
    time,
    onRestart,
    status,
    setStatus,
    autoplay,
    toggleAutoplay,
    gameState,
    hardMode,
    setHardMode
  } = gameData;

  return (
    <div className="flex flex-col gap-2 p-4">
      <Points points={points} setPoints={setPoints} />
      <Timer time={time.toFixed(1)} />
      <GameButton
        onRestart={onRestart}
        status={status}
        setStatus={setStatus}
        autoplay={autoplay}
        toggleAutoplay={toggleAutoplay}
        gameState={gameState}
        hardMode={hardMode}
        setHardMode={setHardMode}
      />
    </div>
  );
};


export default GameInfo;
