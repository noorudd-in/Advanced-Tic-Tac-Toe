import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateGameState } from "../../state/gameSlice";
import toast, { Toaster } from "react-hot-toast";
import ThreeGridTwoPlayerDemo from "../../demo/ThreeGridTwoPlayerDemo";
import FourGridTwoPlayerDemo from "../../demo/FourGridTwoPlayerDemo";

const SelectAILevel = () => {
  const [level, setLevel] = useState("easy");
  const [mode, setMode] = useState("basic");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    let data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    dispatch(
      updateGameState({
        data: data,
        players: 2,
        grid: 3,
        mode: mode,
        playersName: { p1: "", p2: "", p3: "" },
        level: level,
      })
    );
    navigate("/game");
  };
  return (
    <>
      <Toaster />
      <div className="flex justify-center font-mono text-3xl mt-5">
        Select Level
      </div>
      <div className="flex justify-center">
        <button
          className={`p-2 m-2 text-xl rounded-lg ${
            level == "easy"
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setLevel("easy")}
        >
          Easy Level
        </button>
        <button
          className={`p-2 m-2 text-xl rounded-lg ${
            level == "hard"
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setLevel("hard")}
        >
          Hard Level
        </button>
      </div>

      <div className="flex justify-center mb-2">
        <button
          className={`p-2 m-2 rounded-lg ${
            mode == "basic"
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setMode("basic")}
        >
          Basic
        </button>
        <button
          className={`p-2 m-2 rounded-lg ${
            mode == "advance"
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setMode("advance")}
        >
          Advance
        </button>
      </div>

      <ThreeGridTwoPlayerDemo />

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

export default SelectAILevel;
