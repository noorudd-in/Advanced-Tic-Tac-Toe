import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ThreeGridTwoPlayerDemo from "../../demo/ThreeGridTwoPlayerDemo";
import FourGridTwoPlayerDemo from "../../demo/FourGridTwoPlayerDemo";
import FourGridThreePlayerDemo from "../../demo/FourGridThreePlayerDemo";
import FiveGridTwoPlayerDemo from "../../demo/FiveGridTwoPlayerDemo";
import FiveGridThreePlayerDemo from "../../demo/FiveGridThreePlayerDemo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateGameState } from "../../state/gameSlice";
import toast, { Toaster } from "react-hot-toast";

const SelectLevel = () => {
  const [players, setPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState({ p1: "", p2: "", p3: "" });
  const [gridSize, setGridSize] = useState(3);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let mode = searchParams.get("mode");

  const handleStart = () => {
    if (playerNames.p1 == "") {
      toast.error("Enter Player One Name");
      return;
    }
    if (playerNames.p2 == "") {
      toast.error("Enter Player Two Name");
      return;
    }
    if (playerNames.p1 == playerNames.p2) {
      toast.error("Two players cannot have same name");
      return;
    }

    if (players == 3) {
      if (playerNames.p3 == "") {
        toast.error("Enter Player Three Name");
        return;
      }
      if (
        playerNames.p1 == playerNames.p2 ||
        playerNames.p1 == playerNames.p3 ||
        playerNames.p2 == playerNames.p3
      ) {
        toast.error("Two players cannot have same name");
        return;
      }
    }

    let data = new Array(gridSize * gridSize).fill(null);
    console.log(mode);
    dispatch(
      updateGameState({
        data: data,
        players: players,
        grid: gridSize,
        mode: mode,
        playersName: playerNames,
      })
    );
    navigate("/basic");
  };
  return (
    <>
      <Toaster />
      <div className="flex justify-center font-mono text-3xl mt-5">
        Select Level
      </div>
      <div className="flex justify-center">
        {mode[0].toUpperCase() + mode.slice(1)} Version
      </div>
      <div className="flex justify-center">
        <button
          className={`p-2 m-2 text-xl rounded-lg ${
            players == 2
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setPlayers(2)}
        >
          2 Players
        </button>
        <button
          className={`p-2 m-2 text-xl rounded-lg ${
            players == 3
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => {
            setPlayers(3);
            if (gridSize == 3) setGridSize(4);
          }}
        >
          3 Players
        </button>
      </div>
      <div className="flex justify-center mb-2">
        {players == 2 && (
          <button
            className={`p-2 m-2 rounded-lg ${
              gridSize == 3
                ? "bg-orange-500 text-orange-950"
                : "border border-orange-500"
            }`}
            onClick={() => setGridSize(3)}
          >
            3 x 3
          </button>
        )}
        {players == 3 && (
          <button className="p-2 m-2 rounded-lg bg-slate-500 text-white">
            3 x 3
          </button>
        )}

        <button
          className={`p-2 m-2 rounded-lg ${
            gridSize == 4
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setGridSize(4)}
        >
          4 x 4
        </button>
        <button
          className={`p-2 m-2 rounded-lg ${
            gridSize == 5
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setGridSize(5)}
        >
          5 x 5
        </button>
      </div>

      {players == 2 && (
        <>
          {gridSize == 3 && <ThreeGridTwoPlayerDemo />}
          {gridSize == 4 && <FourGridTwoPlayerDemo />}
          {gridSize == 5 && <FiveGridTwoPlayerDemo />}
        </>
      )}
      {players == 3 && (
        <>
          {gridSize == 4 && <FourGridThreePlayerDemo />}
          {gridSize == 5 && <FiveGridThreePlayerDemo />}
        </>
      )}

      <div className="grid place-items-center mt-5">
        <input
          placeholder="Enter Player 1 Name"
          className="text-black p-1 m-1 rounded-md bg-white"
          value={playerNames.p1}
          onChange={(e) =>
            setPlayerNames({ ...playerNames, p1: e.target.value })
          }
        />
        <input
          placeholder="Enter Player 2 Name"
          className="text-black p-1 m-1 rounded-md bg-white"
          value={playerNames.p2}
          onChange={(e) =>
            setPlayerNames({ ...playerNames, p2: e.target.value })
          }
        />
        {players == 3 && (
          <input
            placeholder="Enter Player 3 Name"
            className="text-black p-1 m-1 rounded-md bg-white"
            value={playerNames.p3}
            onChange={(e) =>
              setPlayerNames({ ...playerNames, p3: e.target.value })
            }
          />
        )}
      </div>

      <div className="grid place-items-center mt-5 mb-10">
        <button
          className="p-2 m-2 text-xl rounded-lg bg-orange-500 text-orange-950"
          onClick={handleStart}
        >
          Start Game
        </button>
        <button
          className="p-2 m-2 text-xl rounded-lg bg-orange-500 text-orange-950"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default SelectLevel;
