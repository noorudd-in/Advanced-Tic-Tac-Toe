import { useSelector } from "react-redux";
import Tile from "../Tile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const winnerCombinations = [
  { combi: [0, 1, 2] },
  { combi: [3, 4, 5] },
  { combi: [6, 7, 8] },
  { combi: [0, 3, 6] },
  { combi: [1, 4, 7] },
  { combi: [2, 5, 8] },
  { combi: [0, 4, 8] },
  { combi: [2, 4, 6] },
];

const ThreeGridBoard = () => {
  const state = useSelector((state) => state.gameState);
  const [boardData, setBoardData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winnerTiles, setWinnerTiles] = useState(null);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState([0, 0]);
  const [nextTileToRemove, setNextTileToRemove] = useState(null);
  let mode = state.mode;
  const navigate = useNavigate();

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
    if (currentPlayer == 1) {
      newBoard[index] = "X";
      setCurrentPlayer(2);
    } else {
      newBoard[index] = "O";
      setCurrentPlayer(1);
    }
    if (mode == "advance" && history.length >= 5) {
      setNextTileToRemove(history[1]);
      let newHistory = [...history];
      newBoard[history[0]] = null;
      newHistory.shift();
      newHistory.push(index);
      setHistory(newHistory);
    } else {
      setHistory([...history, index]);
    }
    setBoardData(newBoard);
    let winnerStatus = checkWinner(newBoard, currentPlayer);
    let drawStatus = checkDraw(newBoard);
    if (winnerStatus) {
      setWinner(currentPlayer);
      return;
    }
    if (drawStatus) {
      setWinner(0);
      return;
    }
  };

  const checkWinner = (newBoard) => {
    for (const { combi } of winnerCombinations) {
      const tile1 = newBoard[combi[0]];
      const tile2 = newBoard[combi[1]];
      const tile3 = newBoard[combi[2]];
      if (tile1 == tile2 && tile1 == tile3 && tile1 != null) {
        toast.success(`${state.playersName[`p${currentPlayer}`]} won the game`);
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
        </div>
      </div>

      {/* Grid / Board */}
      <div className="board-3g grid cursor-pointer relative justify-center mt-10">
        <Tile
          value={boardData[0]}
          classname={`bottom-border right-border text-4xl ${
            winnerTiles?.includes(0) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(0)}
          nextTile={nextTileToRemove == 0}
        />
        <Tile
          value={boardData[1]}
          classname={`bottom-border right-border text-4xl ${
            winnerTiles?.includes(1) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(1)}
          nextTile={nextTileToRemove == 1}
        />
        <Tile
          value={boardData[2]}
          classname={`bottom-border text-4xl ${
            winnerTiles?.includes(2) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(2)}
          nextTile={nextTileToRemove == 2}
        />
        <Tile
          value={boardData[3]}
          classname={`bottom-border right-border text-4xl ${
            winnerTiles?.includes(3) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(3)}
          nextTile={nextTileToRemove == 3}
        />
        <Tile
          value={boardData[4]}
          classname={`bottom-border right-border text-4xl ${
            winnerTiles?.includes(4) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(4)}
          nextTile={nextTileToRemove == 4}
        />
        <Tile
          value={boardData[5]}
          classname={`bottom-border text-4xl ${
            winnerTiles?.includes(5) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(5)}
          nextTile={nextTileToRemove == 5}
        />
        <Tile
          value={boardData[6]}
          classname={`right-border text-4xl ${
            winnerTiles?.includes(6) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(6)}
          nextTile={nextTileToRemove == 6}
        />
        <Tile
          value={boardData[7]}
          classname={`right-border text-4xl ${
            winnerTiles?.includes(7) && "bg-orange-400"
          }`}
          handleClick={() => handleClick(7)}
          nextTile={nextTileToRemove == 7}
        />
        <Tile
          value={boardData[8]}
          handleClick={() => handleClick(8)}
          classname={`text-4xl ${winnerTiles?.includes(8) && "bg-orange-400"}`}
          nextTile={nextTileToRemove == 8}
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

export default ThreeGridBoard;