import { useEffect, useState, useRef } from 'react';
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
  const [countdown, setCountdown] = useState(2);
  const [pos, setPos] = useState({ x, y });

  // 👉 Dùng ref cho velocity để tránh re-render
  const velocityRef = useRef({
    vx: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
    vy: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
  });

  const gameStateRef = useRef(gameState);
  const intervalRef = useRef(null);
  const animRef = useRef(null);

  // Reset countdown khi vào PLAYING
  useEffect(() => {
    gameStateRef.current = gameState;
    if (gameState === GAME_STATES.PLAYING) {
      setCountdown(2);
    }
  }, [gameState]);

  // Đếm mờ dần
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isCorrect || gameStateRef.current === GAME_STATES.GAMEOVER) return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0.1 || gameStateRef.current === GAME_STATES.GAMEOVER) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return +(prev - 0.1).toFixed(1);
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [isCorrect, gameState]);

  // 👇 Di chuyển khi hard mode
  useEffect(() => {
    if (!hardMode || isCorrect || gameState !== GAME_STATES.PLAYING) return;

    const update = () => {
      setPos((prev) => {
        const velocity = velocityRef.current;

        let newX = prev.x + velocity.vx;
        let newY = prev.y + velocity.vy;

        // Chạm biên thì dội lại
        if (newX < 5 || newX > 95) velocity.vx *= -1;
        if (newY < 5 || newY > 95) velocity.vy *= -1;

        return {
          x: Math.max(5, Math.min(newX, 95)),
          y: Math.max(5, Math.min(newY, 95)),
        };
      });

      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animRef.current);
  }, [hardMode, isCorrect, gameState]);

  // Style
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
