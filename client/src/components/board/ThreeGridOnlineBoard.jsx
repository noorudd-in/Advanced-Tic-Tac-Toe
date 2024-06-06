import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tile from "../Tile";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../constant";

const socket = io(SOCKET_URL, {
  autoConnect: true,
});

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

const ThreeGridOnlineBoard = () => {
  const [boardData, setBoardData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [winnerTiles, setWinnerTiles] = useState(null);
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState([0, 0]);
  const [nextTileToRemove, setNextTileToRemove] = useState(null);
  const state = useSelector((state) => state.onlineState);
  const navigate = useNavigate();

  const handleClick = (index) => {
    // Check if board is already filled
    if (boardData[index] != null) {
      return;
    }
    if (winner != null) {
      return;
    }
    if (state.myPlayerId != currentPlayer) {
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
    let newHistory;
    if (state.mode == "advance" && history.length >= 5) {
      setNextTileToRemove(history[1]);
      newHistory = [...history];
      newBoard[history[0]] = null;
      newHistory.shift();
      newHistory.push(index);
      setHistory(newHistory);
    } else {
      newHistory = [...history, index];
      setHistory(newHistory);
    }
    setBoardData(newBoard);

    let winnerStatus = checkWinner(newBoard, currentPlayer);
    let drawStatus = checkDraw(newBoard);
    let newScores;
    if (winnerStatus) {
      newScores = [...scores];
      newScores[currentPlayer - 1] = newScores[currentPlayer - 1] + 1;
      setScores(newScores);
    }
    socket.emit("send_move", {
      data: newBoard,
      currentPlayer: currentPlayer == 1 ? 2 : 1,
      room: state.room,
      scores: newScores,
      tileToRemove: history[1],
      history: newHistory,
    });

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
        setWinnerTiles(combi);
        return combi;
      }
    }
    return false;
  };

  const checkDraw = (newBoard) => newBoard.every((ele) => ele != null);

  const handleRestart = () => {
    socket.emit("restart_game", {
      room: state.room,
      message: "Game restarted by your opponent!",
    });
    setWinner(null);
    setWinnerTiles(null);
    setBoardData(state.data);
    setHistory([]);
  };

  useEffect(() => {
    socket.on(`get_move${state.room}`, (data) => {
      setBoardData(data.data);
      if (state.mode == "advance" && data.history >= 5) {
        setNextTileToRemove(data.tileToRemove);
      }
      setHistory(data.history);
      setCurrentPlayer(data.currentPlayer);
      let winnerStatus = checkWinner(
        data.data,
        data.currentPlayer == 1 ? 2 : 1
      );
      let drawStatus = checkDraw(data.data);
      if (winnerStatus) {
        setWinner(data.currentPlayer);
        setScores(data.scores);
      }
      if (drawStatus) {
        setWinner(0);
      }
    });

    socket.on(`restart_game${state.room}`, (data) => {
      setWinner(null);
      setWinnerTiles(null);
      setBoardData(state.data);
      setHistory([]);
      alert(data);
    });

    socket.on(`user_left${state.room}`, () =>
      alert(
        "Your opponent has left the game. You can either wait for them to rejoin or go back and restart a new game."
      )
    );
  }, [socket]);

  useEffect(() => {
    setBoardData(state.data);
  }, [state]);
  return (
    <>
      <div className="flex justify-center text-2xl font-mono">
        <div>
          <div className={currentPlayer == 1 && "border-b border-b-orange-500"}>
            {state.playerOne[0]?.toUpperCase() + state.playerOne?.slice(1)}:{" "}
            {scores[0]}
          </div>
          <div className={currentPlayer == 2 && "border-b border-b-orange-500"}>
            {state.playerTwo[0]?.toUpperCase() + state.playerTwo?.slice(1)}:{" "}
            {scores[1]}
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
            {winner == 0 && "Draw"}
            {winner == 1 && state.playerOne + " Wins!"}
            {winner == 2 && state.playerTwo + " Wins!"}
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

export default ThreeGridOnlineBoard;
