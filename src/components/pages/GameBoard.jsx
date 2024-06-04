import { useSelector } from "react-redux";
import ThreeGridBoard from "../board/ThreeGridBoard";
import FourGridBoard from "../board/FourGridBoard";
import FiveGridBoard from "../board/FiveGridBoard";
import AIBoard from "../board/AIBoard";
const GameBoard = () => {
  const state = useSelector((state) => state.gameState);

  return (
    <>
      {state.grid == 3 && state.level == null && <ThreeGridBoard />}
      {state.grid == 4 && state.level == null && <FourGridBoard />}
      {state.grid == 5 && state.level == null && <FiveGridBoard />}
      {state.level == "easy" || (state.level == "hard" && <AIBoard />)}
    </>
  );
};

export default GameBoard;
