import { useSelector } from "react-redux";
import ThreeGridBoard from "../board/ThreeGridBoard";
import FourGridBoard from "../board/FourGridBoard";
const GameBoard = () => {
  const state = useSelector((state) => state.gameState);

  return (
    <>
      {state.grid == 3 && <ThreeGridBoard />}
      {state.grid == 4 && <FourGridBoard />}
    </>
  );
};

export default GameBoard;
