import { useSelector } from "react-redux";
import ThreeGridBoard from "../board/ThreeGridBoard";
const GameBoard = () => {
  const state = useSelector((state) => state.gameState);

  return <>{state.grid == 3 && <ThreeGridBoard />}</>;
};

export default GameBoard;
