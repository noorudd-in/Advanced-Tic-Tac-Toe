import { useState } from "react";
import Rooms from "../Rooms";
import ThreeGridTwoPlayerDemo from "../../demo/ThreeGridTwoPlayerDemo";
import FourGridTwoPlayerDemo from "../../demo/FourGridTwoPlayerDemo";
import FiveGridTwoPlayerDemo from "../../demo/FiveGridTwoPlayerDemo";

const SelectOnlineLevel = () => {
  const [mode, setMode] = useState("basic");
  const [gridSize, setGridSize] = useState(3);

  return (
    <>
      <div className="flex justify-center">
        <button
          className={`p-2 m-2 text-xl rounded-lg ${
            mode == "basic"
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setMode("basic")}
        >
          Basic
        </button>
        <button
          className={`p-2 m-2 text-xl rounded-lg ${
            mode == "advance"
              ? "bg-orange-500 text-orange-950"
              : "border border-orange-500"
          }`}
          onClick={() => setMode("advance")}
        >
          Advance
        </button>
      </div>
      <div className="flex justify-center mb-2">
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

      {gridSize == 3 && <ThreeGridTwoPlayerDemo />}
      {gridSize == 4 && <FourGridTwoPlayerDemo />}
      {gridSize == 5 && <FiveGridTwoPlayerDemo />}
      <Rooms mode={mode} grid={gridSize} />
    </>
  );
};

export default SelectOnlineLevel;
