import CircleButton from './CircleButton';
import Combo from './Combo';

const GameZone = ({ numbers, wrongValue, onClickNumber, gameState, comboMessage}) => {
  return (
    <div
      className={`relative w-[500px] h-[500px] border border-gray-400 rounded p-4 bg-white `}>
      <Combo comboMessage={comboMessage}/>
      {numbers
        .sort((a, b) => a.value - b.value)
        .map((num) => (
        <CircleButton
          key={num.id}
          value={num.value}
          x={num.x}
          y={num.y}
          onClick={() => onClickNumber(num.value)}
          isWrong={wrongValue === num.value}
          isCorrect={num.isCorrect || false}
          gameState={gameState}
        />
        ))}
    </div>
  );
};

export default GameZone;