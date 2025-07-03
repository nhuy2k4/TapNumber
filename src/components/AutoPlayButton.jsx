const AutoPlayButton = ({onClick, isAuto, gameState}) => {
    if (gameState !== 'playing' ) return null;
    else {return ( 
        <button 
            className="playbutton"
            onClick={onClick}
        >
            {isAuto ? '🤖 Auto Play OFF' : '🤖 Auto Play ON'}
        </button>
    );}
}
 
export default AutoPlayButton;