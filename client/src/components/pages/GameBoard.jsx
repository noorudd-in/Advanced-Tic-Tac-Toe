import { useSelector } from "react-redux";
import ThreeGridBoard from "../board/ThreeGridBoard";
import FourGridBoard from "../board/FourGridBoard";
import FiveGridBoard from "../board/FiveGridBoard";
import AIBoard from "../board/AIBoard";
import WaitingForOpponent from "../WaitingForOpponent";
import OnlineBoard from "../board/OnlineBoard";
const GameBoard = () => {
  const state = useSelector((state) => state.gameState);
  const onlineState = useSelector((state) => state.onlineState);
  console.log(state, onlineState);

  if (onlineState.mode == null && state.grid == 3 && state.level == null)
    return <ThreeGridBoard />;

  if (onlineState.mode == null && state.grid == 4 && state.level == null)
    return <FourGridBoard />;

  if (onlineState.mode == null && state.grid == 5 && state.level == null)
    return <FiveGridBoard />;

  if (
    onlineState.mode == null &&
    (state.level == "easy" || state.level == "hard")
  )
    return <AIBoard />;

  if (onlineState.mode != null && onlineState.playerTwo == null)
    return <WaitingForOpponent />;

  if (onlineState.mode != null && onlineState.playerTwo != null)
    return <OnlineBoard />;

  return <>No Board</>;
};

export default GameBoard;
