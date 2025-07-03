import { useEffect, useState, useRef } from 'react';
import { GAME_STATES } from '../utils/constants';

const CircleButton = ({ value, x, y, onClick, isWrong, isCorrect, gameState }) => {
  const [countdown, setCountdown] = useState(2); // 2s
  const gameStateRef = useRef(gameState);
  const intervalRef = useRef(null);
  useEffect(() => {
    gameStateRef.current = gameState;
    if (gameState === GAME_STATES.PLAYING) {
    setCountdown(2); // 🔄 Reset lại độ mờ
  }
  }, [gameState]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!isCorrect || gameStateRef.current === GAME_STATES.GAMEOVER) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (gameStateRef.current === GAME_STATES.GAMEOVER || prev <= 0.1) {
          clearInterval(interval);
          return prev <= 0.1 ? 0 : prev; // Dừng tại giá trị hiện tại
        }
        return +(prev - 0.1).toFixed(1);
      });
    }, 100);

   return () => {
      // 🧹 clear khi component unmount hoặc isCorrect/gameState thay đổi
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isCorrect, gameState]);

  let baseStyle = 'border-2 border-red-500 bg-white text-red-500';
  if (isWrong) baseStyle = 'border-2 border-red-700 bg-red-500 text';
  if (isCorrect) baseStyle = 'bg-green-500';

  return (
    <button
      onClick={onClick}
      disabled={isCorrect || gameState === GAME_STATES.GAMEOVER}
      className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold ${baseStyle}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%)`,
        opacity: countdown / 2,
        zIndex: 9999 - value,
        transition: 'transform 0.1s linear, opacity 0.1s linear',
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
