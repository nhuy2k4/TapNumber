import { useCallback } from 'react';
import { GAME_STATES } from '../utils/constants';

export function useGameHandler({
  expectedNumber,
  points,
  setNumbers,
  setExpectedNumber,
  setWrongValue,
  setGameState,
  timeoutIds,
  setTimeoutIds,
  updateCombo,
}) {
  const handleClick = useCallback((value) => {
    if (value === expectedNumber) {
      updateCombo();

      if (value !== points) {
        setExpectedNumber(prev => prev + 1);
      }

      setNumbers(prev =>
        prev.map(num =>
          num.value === value ? { ...num, isCorrect: true } : num
        )
      );

      const timeoutId = setTimeout(() => {
        setNumbers(prev => prev.filter(num => num.value !== value));
        setTimeoutIds(prev => prev.filter(id => id !== timeoutId));
      }, 2500);

      setTimeoutIds(prev => [...prev, timeoutId]);
      setWrongValue(null);
    } else {
      timeoutIds.forEach(id => clearTimeout(id));
      setTimeoutIds([]);
      setWrongValue(value);
      setGameState(GAME_STATES.GAMEOVER);

      const title = document.getElementById('title');
      if (title) title.innerText = 'GAME OVER';
    }
  }, [
    expectedNumber,
    points,
    setExpectedNumber,
    setGameState,
    setNumbers,
    setTimeoutIds,
    setWrongValue,
    timeoutIds,
    updateCombo,
  ]);

  return { handleClick };
}
