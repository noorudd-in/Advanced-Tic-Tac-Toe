const Tile = ({ classname, value, handleClick, nextTile }) => {
  let p1symbol = localStorage.getItem("p1symbol");
  let p2symbol = localStorage.getItem("p2symbol");
  let p3symbol = localStorage.getItem("p3symbol");
  let p1 = p1symbol != null ? p1symbol : value;
  let p2 = p2symbol != null ? p2symbol : value;
  let p3 = p3symbol != null ? p3symbol : value;
  let moveValue;
  if (value == "X") moveValue = p1;
  else if (value == "Y" || value == "O") moveValue = p2;
  else if (value == "Z") moveValue = p3;
  console.log(value, moveValue);
  return (
    <div
      className={`tile flex justify-center items-center ${classname}`}
      onClick={handleClick}
    >
      <span className={nextTile ? "animate-pulse" : ""}>{moveValue}</span>
    </div>
  );
};

export default Tile;
