import { useState } from 'react';
import { generateRandomNumbers } from '../utils/generateNumber';
import { GAME_STATES } from '../utils/constants';

export function useGameStatus() {
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [expectedNumber, setExpectedNumber] = useState(0);
  const [wrongValue, setWrongValue] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [timeoutIds, setTimeoutIds] = useState([]);

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
    points, setPoints,
    time, setTime,
    expectedNumber, setExpectedNumber,
    wrongValue, setWrongValue,
    numbers, setNumbers,
    gameState, setGameState,
    timeoutIds, setTimeoutIds,
    restartGame,
  };
}
