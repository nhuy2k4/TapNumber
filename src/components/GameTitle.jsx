import { GAME_STATES } from '../utils/constants';

function GameTitle({ gameState }) {
  const getTitleText = () => {
    switch (gameState) {
      case GAME_STATES.CLEARED:
        return 'ALL CLEARED';
      case GAME_STATES.GAMEOVER:
        return 'GAME OVER';
      default:
        return "LET'S PLAY";
    }
  };

  const getTitleClass = () => {
    switch (gameState) {
      case GAME_STATES.CLEARED:
        return 'text-green-600';
      case GAME_STATES.GAMEOVER:
        return 'text-red-600';
      default:
        return 'text-black';
    }
  };

  return (
    <div
      id="title"
      className={`text-2xl font-bold mb-2 transition-colors duration-300 ${getTitleClass()}`}
    >
      {getTitleText()}
    </div>
  );
}

export default GameTitle;
