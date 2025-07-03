import PlayButton from "./PlayButton";
import AutoPlayButton from "./AutoPlayButton";
const GameButton = ({ onRestart, status, setStatus, autoplay, toggleAutoplay, gameState }) => {
    return ( 
        <div>
            <PlayButton onClick={onRestart} status={status} setStatus={setStatus}/>
            <AutoPlayButton onClick={toggleAutoplay} isAuto={autoplay} gameState={gameState}/>
        </div>
     );
}
 
export default GameButton;