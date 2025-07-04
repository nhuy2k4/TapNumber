import { generateRandomNumbers } from '../utils/generateNumber';
import { GAME_STATES } from '../utils/constants';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useGameLogic() {
  const comboTimestampsRef = useRef([]);

  // Game state
  const [comboMessage, setComboMessage] = useState('');
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [autoplay, setAutoplay] = useState(false);
  const [wrongValue, setWrongValue] = useState(null);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [expectedNumber, setExpectedNumber] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [status, setStatus] = useState(false);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [hardMode, setHardMode] = useState(false); // New state for hard mode

  // Timer when PLAYING
  useEffect(() => {
    let timer = null;
    if (gameState === GAME_STATES.PLAYING) {
      timer = setInterval(() => setTime(prev => +(prev + 0.1).toFixed(1)), 100);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  // When all numbers are cleared
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && numbers.length === 0) {
      setGameState(GAME_STATES.CLEARED);
      const title = document.getElementById('title');
      if (title) title.innerText = 'ALL CLEARED';
    }
  }, [numbers, gameState]);

  // Handle click
  const handleClick = useCallback((value) => {
    const now = Date.now();

    if (value === expectedNumber) {
      // Combo
      comboTimestampsRef.current = [...comboTimestampsRef.current, now].filter(
        t => now - t <= 1000
      );
      if (comboTimestampsRef.current.length >= 3) {
        setComboMessage('🔥 COMBO x3!');
        setTimeout(() => setComboMessage(''), 1000);
        setTime(prev => prev + 2);
        comboTimestampsRef.current = [];
      }

      if (value !== points) {
        setExpectedNumber(n => n + 1);
      }

      setNumbers(prev =>
        prev.map(num =>
          num.value === value ? { ...num, isCorrect: true } : num
        )
      );

      if (gameState === GAME_STATES.PLAYING) {
        const timeoutId = setTimeout(() => {
          setNumbers(prev => prev.filter(num => num.value !== value));
          setTimeoutIds(prev => prev.filter(id => id !== timeoutId));
        }, 2500);
        setTimeoutIds(prev => [...prev, timeoutId]);
      }

      setWrongValue(null);
    } else {
      timeoutIds.forEach(id => clearTimeout(id));
      setTimeoutIds([]);
      setWrongValue(value);
      setGameState(GAME_STATES.GAMEOVER);
      const title = document.getElementById('title');
      if (title) title.innerText = 'GAME OVER';
    }
  }, [expectedNumber, points, gameState, timeoutIds]);

  // Reset game
  const restartGame = () => {
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);
    setTime(0);
    setExpectedNumber(1);
    setWrongValue(null);
    setNumbers(generateRandomNumbers(points));
    setGameState(GAME_STATES.PLAYING);

    const title = document.getElementById('title');
    if (title) title.innerText = "LET'S PLAY";
  };

  return {
    gameData: {
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
    },
    gameActions: {
      setAutoplay,
      setPoints,
      setStatus,
      setHardMode,
      handleClick,
      restartGame,
    },
  };
}