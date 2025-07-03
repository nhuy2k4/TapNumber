import { useState, useEffect, useCallback} from 'react';
import './App.css';
import GameInfo from './components/GameInfo';
import GameZone from './components/GameZone';
import NextPoint from './components/NextPoint';
import { generateRandomNumbers } from './utils/generateNumber';
import { GAME_STATES } from './utils/constants';
import { useAutoplay } from './hooks/useAutoplay';

function App() {
  const [comboTimestamps, setComboTimestamps] = useState([]);
  const [comboMessage, setComboMessage] = useState('');

  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [autoplay, setAutoplay] = useState(false);
  const [wrongValue, setWrongValue] = useState(null);   
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [expectedNumber, setExpectedNumber] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [status, setStatus] = useState(false);
  const [timeoutIds, setTimeoutIds] = useState([]); // Lưu các ID của setTimeout
  // ⏱️ Tăng thời gian khi đang chơi
  useEffect(() => {
    let timer = null;

    if (gameState === GAME_STATES.PLAYING) {
      timer = setInterval(() => setTime(prev => prev + 0.1), 100);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING && numbers.length === 0) {
      setGameState(GAME_STATES.CLEARED);
      const title = document.getElementById('title');
      if (title) title.innerText = 'ALL CLEARED';
    }
  }, [numbers, gameState]);



  // ✅ Khi người chơi (hoặc bot) nhấn số
const handleClick = useCallback((value) => {
 const now = Date.now();

  if (value === expectedNumber) {
    // ✅ Xử lý combo
    setComboTimestamps(prev => {
      const updated = [...prev, now].filter(t => now - t <= 1000); // giữ trong 1s
      if (updated.length >= 3) {
        setComboMessage('🔥 COMBO x3!');
        setTimeout(() => setComboMessage(''), 1000);

        // Bonus: cộng điểm hoặc thêm thời gian
        setTime(prev => prev + 2);
        // setPoints(prev => prev + 1); // hoặc cộng điểm nếu bạn muốn
        return []; // reset combo
      }
      return updated;
    });

    // ⬇ Phần xử lý như cũ
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

  // 🤖 Bot tự nhấn đúng số nếu bật autoplay
  useAutoplay(autoplay, gameState, numbers, expectedNumber, handleClick);
  function restartGame() {
    // 🧹 Xoá timeout cũ
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);

    setTime(0);
    setExpectedNumber(1);
    setWrongValue(null);

    // 🔁 Tạo danh sách số mới hoàn toàn
    setNumbers(generateRandomNumbers(points));

    setGameState(GAME_STATES.PLAYING);

    const title = document.getElementById('title');
    if (title) title.innerText = "LET'S PLAY";
  }
  const gameData = {
    points,
    setPoints,
    time,
    status,
    setStatus,
    autoplay,
    toggleAutoplay: () => setAutoplay(prev => !prev),
    onRestart: restartGame,
    gameState
  };
  return (
  <div className="flex items-center justify-center min-h-screen gap-8">
    <div className="flex flex-col items-start px-4 text-left">
      <div
  id="title"
  className={`text-2xl font-bold mb-2 transition-colors duration-300
    ${
      gameState === GAME_STATES.CLEARED
        ? 'text-green-600'
        : gameState === GAME_STATES.GAMEOVER
        ? 'text-red-600'
        : 'text-black' // ✅ Mặc định
    }`}
>
  {gameState === GAME_STATES.CLEARED
    ? 'ALL CLEARED'
    : gameState === GAME_STATES.GAMEOVER
    ? 'GAME OVER'
    : "LET'S PLAY"}
</div>

      <GameInfo gameData={gameData} />
    </div>

  {/* Cột phải: Game zone */}
  <div className="flex flex-col items-center">
    <GameZone
      numbers={numbers}
      wrongValue={wrongValue}
      onClickNumber={handleClick}
      gameState={gameState}
      comboMessage={comboMessage}
    />
    <NextPoint value={expectedNumber} gameState={gameState} />
  </div>
</div>

  );
}

export default App;