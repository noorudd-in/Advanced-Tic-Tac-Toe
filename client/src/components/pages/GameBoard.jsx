import { useSelector } from "react-redux";
import ThreeGridBoard from "../board/ThreeGridBoard";
import FourGridBoard from "../board/FourGridBoard";
import FiveGridBoard from "../board/FiveGridBoard";
import AIBoard from "../board/AIBoard";
import OnlineBoard from "../board/OnlineBoard";
import ThreeGridOnlineBoard from "../board/ThreeGridOnlineBoard";
import FourGridOnlineBoard from "../board/FourGridOnlineBoard";
import FIveGridOnlineBoard from "../board/FIveGridOnlineBoard";
const GameBoard = () => {
  const state = useSelector((state) => state.gameState);
  const onlineState = useSelector((state) => state.onlineState);

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
  if (onlineState.mode != null && onlineState.grid == 3)
    return <ThreeGridOnlineBoard />;
  if (onlineState.mode != null && onlineState.grid == 4)
    return <FourGridOnlineBoard />;
  if (onlineState.mode != null && onlineState.grid == 5)
    return <FIveGridOnlineBoard />;

  return <>No Board</>;
};

export default GameBoard;
