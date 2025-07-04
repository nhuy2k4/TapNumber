import PlayButton from "./PlayButton";
import AutoPlayButton from "./AutoPlayButton";
import HardMode from "./HardModeButton";
const GameButton = ({ onRestart, status, setStatus, autoplay, toggleAutoplay, gameState, hardMode, setHardMode }) => {
    return ( 
        <div>
            <div>
                <PlayButton onClick={onRestart} status={status} setStatus={setStatus}/>
                <AutoPlayButton onClick={toggleAutoplay} isAuto={autoplay} gameState={gameState}/>
            </div>
            <HardMode
                hardMode={hardMode}
                toggleHardMode={() => setHardMode(prev => !prev)}
                gameState={gameState}
            />
        </div>
     );
}
 
export default GameButton;