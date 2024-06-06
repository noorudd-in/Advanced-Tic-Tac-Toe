import { useSelector } from "react-redux";
import Tile from "../Tile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { clickSound, gameoverSound } from "../../sound";

const winnerCombinations = [
  // Left Upper Grid Combination
  { combi: [0, 1, 2, 3] },
  { combi: [5, 6, 7, 8] },
  { combi: [10, 11, 12, 13] },
  { combi: [5, 16, 17, 18] },
  { combi: [0, 5, 10, 15] },
  { combi: [1, 6, 11, 16] },
  { combi: [2, 7, 12, 17] },
  { combi: [3, 8, 13, 18] },
  { combi: [0, 6, 12, 18] },
  { combi: [3, 7, 11, 18] },
  // Right Upper Grid Combination
  { combi: [1, 2, 3, 4] },
  { combi: [6, 7, 8, 9] },
  { combi: [11, 12, 13, 14] },
  { combi: [16, 17, 18, 19] },
  { combi: [4, 9, 14, 19] },
  { combi: [1, 7, 13, 19] },
  { combi: [4, 8, 12, 16] },
  // Left Lower Gird Combination
  { combi: [20, 21, 22, 23] },
  { combi: [5, 10, 15, 20] },
  { combi: [6, 11, 16, 21] },
  { combi: [7, 12, 17, 22] },
  { combi: [8, 13, 18, 23] },
  { combi: [5, 11, 17, 23] },
  { combi: [8, 12, 16, 20] },
  // Right Lower Grid Combination
  { combi: [21, 22, 23, 24] },
  { combi: [6, 11, 16, 21] },
  { combi: [7, 12, 17, 22] },
  { combi: [8, 13, 18, 23] },
  { combi: [9, 14, 19, 24] },
  { combi: [6, 12, 18, 24] },
  { combi: [9, 13, 17, 21] },
];

const FiveGridBoard = () => {
  const state = useSelector((state) => state.gameState);
  const [boardData, setBoardData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winnerTiles, setWinnerTiles] = useState(null);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState([0, 0, 0]);
  const [nextTileToRemove, setNextTileToRemove] = useState(null);
  let mode = state.mode;
  const navigate = useNavigate();
  let soundEnabled = localStorage.getItem("gameSound");

  const handleClick = (index) => {
    // Check if board is already filled
    if (boardData[index] != null) {
      return;
    }
    if (winner != null) {
      return;
    }
    // Add a move on the board and check for winner and draw
    let newBoard = [...boardData];
    if (state.players == 2) {
      if (currentPlayer == 1) {
        newBoard[index] = "X";
        setCurrentPlayer(2);
      }
      if (currentPlayer == 2) {
        newBoard[index] = "O";
        setCurrentPlayer(1);
      }
    } else {
      if (currentPlayer == 1) {
        newBoard[index] = "X";
        setCurrentPlayer(2);
      }
      if (currentPlayer == 2) {
        newBoard[index] = "Y";
        setCurrentPlayer(3);
      }
      if (currentPlayer == 3) {
        newBoard[index] = "Z";
        setCurrentPlayer(1);
      }
    }

    let len = state.players == 2 ? history.length >= 7 : history.length >= 10;
    if (mode == "advance" && len) {
      setNextTileToRemove(history[1], history);
      let newHistory = [...history];
      newBoard[history[0]] = null;
      newHistory.shift();
      newHistory.push(index);
      setHistory(newHistory);
    } else {
      setHistory([...history, index]);
    }
    if (soundEnabled) clickSound.play();
    window.navigator.vibrate(5);
    setBoardData(newBoard);
    let winnerStatus = checkWinner(newBoard, currentPlayer);
    let drawStatus = checkDraw(newBoard);
    if (winnerStatus) {
      setWinner(currentPlayer);
      return;
    }
    if (drawStatus) {
      if (soundEnabled) gameoverSound.play();
      setWinner(0);
      return;
    }
  };

  const checkWinner = (newBoard) => {
    for (const { combi } of winnerCombinations) {
      const tile1 = newBoard[combi[0]];
      const tile2 = newBoard[combi[1]];
      const tile3 = newBoard[combi[2]];
      const tile4 = newBoard[combi[3]];
      if (tile1 == tile2 && tile1 == tile3 && tile1 == tile4 && tile1 != null) {
        toast.success(`${state.playersName[`p${currentPlayer}`]} won the game`);
        if (soundEnabled) gameoverSound.play();
        setWinnerTiles(combi);
        let newScores = [...scores];
        newScores[currentPlayer - 1] = newScores[currentPlayer - 1] + 1;
        setScores(newScores);
        return true;
      }
    }
  };

  const checkDraw = (newBoard) => newBoard.every((ele) => ele != null);

  const handleRestart = () => {
    setWinner(null);
    setWinnerTiles(null);
    setBoardData(state.data);
    setHistory([]);
    alert(
      `Now ${
        currentPlayer == 1
          ? state.playersName.p1[0]?.toUpperCase() +
            state.playersName.p1?.slice(1)
          : state.playersName.p2[0]?.toUpperCase() +
            state.playersName.p2?.slice(1)
      } will play first`
    );
  };

  useEffect(() => {
    if (mode == null) {
      window.location.replace("/");
    }
    setBoardData(state.data);
  }, [state]);
  return (
    <>
      <Toaster />
      {/* Players Name */}
      <div className="flex justify-center text-2xl font-mono">
        <div>
          <div className={currentPlayer == 1 && "border-b border-b-orange-500"}>
            {state.playersName.p1[0]?.toUpperCase() +
              state.playersName.p1?.slice(1)}
            : {scores[0]}
          </div>
          <div className={currentPlayer == 2 && "border-b border-b-orange-500"}>
            {state.playersName.p2[0]?.toUpperCase() +
              state.playersName.p2?.slice(1)}
            : {scores[1]}
          </div>

          {state.players == 3 && (
            <>
              <div
                className={currentPlayer == 3 && "border-b border-b-orange-500"}
              >
                {state.playersName.p3[0]?.toUpperCase() +
                  state.playersName.p3?.slice(1)}
                : {scores[2]}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Grid / Board */}
      <div className="board-5g grid cursor-pointer relative justify-center mt-10">
        <Tile
          value={boardData[0]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(0) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(0)}
          nextTile={nextTileToRemove == 0}
        />
        <Tile
          value={boardData[1]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(1) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(1)}
          nextTile={nextTileToRemove == 1}
        />
        <Tile
          value={boardData[2]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(2) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(2)}
          nextTile={nextTileToRemove == 2}
        />
        <Tile
          value={boardData[3]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(3) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(3)}
          nextTile={nextTileToRemove == 3}
        />
        <Tile
          value={boardData[4]}
          classname={`bottom-border text-2xl ${
            winnerTiles?.includes(4) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(4)}
          nextTile={nextTileToRemove == 4}
        />
        <Tile
          value={boardData[5]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(5) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(5)}
          nextTile={nextTileToRemove == 5}
        />
        <Tile
          value={boardData[6]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(6) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(6)}
          nextTile={nextTileToRemove == 6}
        />
        <Tile
          value={boardData[7]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(7) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(7)}
          nextTile={nextTileToRemove == 7}
        />
        <Tile
          value={boardData[8]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(8) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(8)}
          nextTile={nextTileToRemove == 8}
        />
        <Tile
          value={boardData[9]}
          classname={`bottom-border text-2xl ${
            winnerTiles?.includes(9) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(9)}
          nextTile={nextTileToRemove == 9}
        />
        <Tile
          value={boardData[10]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(10) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(10)}
          nextTile={nextTileToRemove == 10}
        />
        <Tile
          value={boardData[11]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(11) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(11)}
          nextTile={nextTileToRemove == 11}
        />
        <Tile
          value={boardData[12]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(12) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(12)}
          nextTile={nextTileToRemove == 12}
        />
        <Tile
          value={boardData[13]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(13) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(13)}
          nextTile={nextTileToRemove == 13}
        />
        <Tile
          value={boardData[14]}
          classname={`bottom-border text-2xl ${
            winnerTiles?.includes(14) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(14)}
          nextTile={nextTileToRemove == 14}
        />
        <Tile
          value={boardData[15]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(15) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(15)}
          nextTile={nextTileToRemove == 15}
        />
        <Tile
          value={boardData[16]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(16) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(16)}
          nextTile={nextTileToRemove == 16}
        />
        <Tile
          value={boardData[17]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(17) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(17)}
          nextTile={nextTileToRemove == 17}
        />
        <Tile
          value={boardData[18]}
          classname={`bottom-border right-border text-2xl ${
            winnerTiles?.includes(18) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(18)}
          nextTile={nextTileToRemove == 18}
        />
        <Tile
          value={boardData[19]}
          classname={`bottom-border text-2xl ${
            winnerTiles?.includes(19) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(19)}
          nextTile={nextTileToRemove == 19}
        />
        <Tile
          value={boardData[20]}
          classname={`right-border text-2xl ${
            winnerTiles?.includes(20) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(20)}
          nextTile={nextTileToRemove == 20}
        />
        <Tile
          value={boardData[21]}
          classname={`right-border text-2xl ${
            winnerTiles?.includes(21) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(21)}
          nextTile={nextTileToRemove == 21}
        />
        <Tile
          value={boardData[22]}
          classname={`right-border text-2xl ${
            winnerTiles?.includes(22) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(22)}
          nextTile={nextTileToRemove == 22}
        />
        <Tile
          value={boardData[23]}
          classname={`right-border text-2xl ${
            winnerTiles?.includes(23) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(23)}
          nextTile={nextTileToRemove == 23}
        />
        <Tile
          value={boardData[24]}
          classname={`text-2xl ${
            winnerTiles?.includes(24) ? "bg-orange-400" : ""
          }`}
          handleClick={() => handleClick(24)}
          nextTile={nextTileToRemove == 24}
        />
      </div>

      {/* Declare Winner if found */}
      {winner != null && (
        <div className="flex justify-center my-5">
          <h1 className="text-2xl m-3 p-3 border-dotted border-t-2 border-b-2 border-orange-400 py-2">
            {winner == 0 ? "Draw" : state.playersName[`p${winner}`] + " Wins!"}
          </h1>
        </div>
      )}

      {/* Restart Game once game ends */}
      {winner != null && (
        <div className="flex justify-center">
          <button
            className="p-2 m-2 text-xl rounded-lg bg-orange-500 text-orange-950"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="p-2 m-2 text-xl rounded-lg bg-orange-500 text-orange-950"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      )}
    </>
  );
};

export default FiveGridBoard;
