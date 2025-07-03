const NextPoint = ({ value, gameState }) => {
    if (gameState !== 'playing' ) return null;
    else {
        return <p>Next: {value}</p>;
    }
};
export default NextPoint;
