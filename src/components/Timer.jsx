const Timer = ({ time }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <label>Time:</label>
      <p className="time-counter">{time}s</p>
    </div>
  );
};

export default Timer;
