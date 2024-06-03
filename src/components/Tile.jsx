const Tile = ({ classname, value, handleClick }) => {
  return (
    <div
      className={`tile flex justify-center items-center ${classname}`}
      onClick={handleClick}
    >
      {value}
    </div>
  );
};

export default Tile;
