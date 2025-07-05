import { useCircleLogic } from '../hooks/useCircleLogic';
import { GAME_STATES } from '../utils/constants';

const CircleButton = ({
  value,
  x,
  y,
  onClick,
  isWrong,
  isCorrect,
  gameState,
  hardMode,
}) => {
  const { countdown, pos } = useCircleLogic({ x, y, isCorrect, gameState, hardMode });

  let baseStyle = 'border-2 border-red-500 bg-white text-red-500';
  if (isWrong) baseStyle = 'border-2 border-red-700 bg-red-500 text';
  if (isCorrect) baseStyle = 'bg-green-500';

  return (
    <button
      onClick={onClick}
      disabled={isCorrect || gameState === GAME_STATES.GAMEOVER}
      className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold ${baseStyle}`}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: countdown / 2,
        zIndex: 9999 - value,
        transition: isCorrect ? 'opacity 0.1s' : 'none',
      }}
    >
      <span className={`${isCorrect ? 'relative -top-[5px]' : ''}`}>
        {value}
      </span>
      {isCorrect && (
        <span className="absolute text-[10px] text-white mt-8">
          {countdown}s
        </span>
      )}
    </button>
  );
};

export default CircleButton;
