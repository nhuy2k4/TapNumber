import { useEffect } from 'react';
import { GAME_STATES } from '../utils/constants';

export function useGameTimer(gameState, setTime) {
  useEffect(() => {
    let timer = null;
    if (gameState === GAME_STATES.PLAYING) {
      timer = setInterval(() => setTime(prev => +(prev + 0.1).toFixed(1)), 100);
    }
    return () => clearInterval(timer);
  }, [gameState, setTime]);
}
