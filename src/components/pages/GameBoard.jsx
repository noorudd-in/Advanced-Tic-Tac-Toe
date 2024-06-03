import { useSelector } from "react-redux";
import ThreeGridBoard from "../board/ThreeGridBoard";
import FourGridBaord from "../board/FourGridBaord";
const GameBoard = () => {
  const state = useSelector((state) => state.gameState);

  return (
    <>
      {state.grid == 3 && <ThreeGridBoard />}
      {state.grid == 4 && <FourGridBaord />}
    </>
  );
};

export default GameBoard;
