const Combo = ({ comboMessage }) => {
  return ( 
    <div>
      {comboMessage && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-500 font-bold text-xl animate-bounce z-50">
          {comboMessage}
        </div>
      )}
    </div>
  );
};

export default Combo;