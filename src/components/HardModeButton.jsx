export default function HardMode({ hardMode, toggleHardMode, gameState}) {
  if (gameState !== 'playing' ) return null;
  return (
    <button
      onClick={toggleHardMode}
      className={`px-4 py-2 rounded font-semibold mt-2 transition-all
        ${hardMode ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'}
      `}
    >
      Hard Mode: {hardMode ? 'ON' : 'OFF'}
    </button>
  );
}