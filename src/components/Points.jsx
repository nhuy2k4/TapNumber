const Points = ({ points, setPoints }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    setPoints(newValue);
  };

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <label htmlFor="">Points: </label>
      <input
        type="number"
        value={points}
        onChange={handleChange}
        className="border px-2 py-1 rounded w-20 text-center"
      />
    </div>
  );
};

export default Points;
