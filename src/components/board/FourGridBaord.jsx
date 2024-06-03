import { useSelector } from "react-redux";
import Tile from "../Tile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const FourGridBaord = () => {
  const state = useSelector((state) => state.gameState);
  const [boardData, setBoardData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winnerTiles, setWinnerTiles] = useState(null);
  const [history, setHistory] = useState([]);
  let mode = state.mode;
  const navigate = useNavigate();
  return (
    <>
      <Toaster />

      {/* Players Name */}
      <div
        className={`flex justify-center font-mono ${
          state.players == 2 ? "text-2xl" : "text-xl"
        }`}
      >
        <span className={currentPlayer == 1 && "border-b border-b-orange-500"}>
          {state.playersName.p1[0]?.toUpperCase() +
            state.playersName.p1?.slice(1)}{" "}
        </span>
        <span className="mx-2">vs</span>
        <span className={currentPlayer == 2 && "border-b border-b-orange-500"}>
          {state.playersName.p2[0]?.toUpperCase() +
            state.playersName.p2?.slice(1)}
        </span>
        {state.players == 3 && (
          <>
            <span className="mx-2">vs</span>
            <span
              className={currentPlayer == 3 && "border-b border-b-orange-500"}
            >
              {state.playersName.p3[0]?.toUpperCase() +
                state.playersName.p3?.slice(1)}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default FourGridBaord;
