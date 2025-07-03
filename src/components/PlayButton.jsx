const PlayButton = ({ onClick, status, setStatus }) => {
  const handleClick = () => {
    onClick(); // luôn gọi restartGame hoặc startGame
    if(status == false)
        setStatus(true); // Toggle trạng thái
  };

  return (
    <button onClick={handleClick} className="mr-6">
      {status ? '🔁 Restart' : '▶️ Play'}
    </button>
  );
};

export default PlayButton;
