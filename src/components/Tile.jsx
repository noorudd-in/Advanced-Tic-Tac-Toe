const Tile = ({ classname, value, handleClick, nextTile }) => {
  return (
    <div
      className={`tile flex justify-center items-center ${classname}`}
      onClick={handleClick}
    >
      <span className={nextTile && "animate-pulse"}>{value}</span>
    </div>
  );
};

export default Tile;
