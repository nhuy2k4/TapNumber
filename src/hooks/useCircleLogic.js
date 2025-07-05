import { useEffect, useRef, useState } from 'react';
import { GAME_STATES } from '../utils/constants';

export function useCircleLogic({ x, y, isCorrect, gameState, hardMode }) {
  const [countdown, setCountdown] = useState(2);
  const [pos, setPos] = useState({ x, y });

  const velocityRef = useRef({
    vx: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
    vy: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
  });

  const gameStateRef = useRef(gameState);
  const intervalRef = useRef(null);
  const animRef = useRef(null);

  // Reset countdown
  useEffect(() => {
    gameStateRef.current = gameState;
    if (gameState === GAME_STATES.PLAYING) setCountdown(2);
  }, [gameState]);

  // Countdown logic
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isCorrect || gameStateRef.current === GAME_STATES.GAMEOVER) return;

    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0.1 || gameStateRef.current === GAME_STATES.GAMEOVER) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return +(prev - 0.1).toFixed(1);
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [isCorrect, gameState]);

  // Move if hard mode
  useEffect(() => {
    if (!hardMode || isCorrect || gameState !== GAME_STATES.PLAYING) return;

    const update = () => {
      setPos(prev => {
        const { vx, vy } = velocityRef.current;
        let newX = prev.x + vx;
        let newY = prev.y + vy;

        if (newX < 5 || newX > 95) velocityRef.current.vx *= -1;
        if (newY < 5 || newY > 95) velocityRef.current.vy *= -1;

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

  return { countdown, pos };
}
