import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
  const [p1Symbol, setP1Symbol] = useState(
    localStorage.getItem("p1symbol") == null
      ? "X"
      : localStorage.getItem("p1symbol")
  );
  const [p2Symbol, setP2Symbol] = useState(
    localStorage.getItem("p2symbol") == null
      ? "O"
      : localStorage.getItem("p2symbol")
  );
  const [p3Symbol, setP3Symbol] = useState(
    localStorage.getItem("p3symbol") == null
      ? "Z"
      : localStorage.getItem("p3symbol")
  );
  const [emojiPicker1, setEmojiPicker1] = useState(false);
  const [emojiPicker2, setEmojiPicker2] = useState(false);
  const [emojiPicker3, setEmojiPicker3] = useState(false);
  const navigate = useNavigate();

  const handleEmoji = (data, index) => {
    if (index == 1) {
      if (p2Symbol == data.native || p3Symbol == data.native) {
        toast.error("Two players cannot have same symbol");
        return;
      }
      localStorage.setItem("p1symbol", data.native);
      setP1Symbol(data.native);
      setEmojiPicker1(false);
    }
    if (index == 2) {
      if (p1Symbol == data.native || p3Symbol == data.native) {
        toast.error("Two players cannot have same symbol");
        return;
      }
      localStorage.setItem("p2symbol", data.native);
      setP2Symbol(data.native);
      setEmojiPicker2(false);
    }
    if (index == 3) {
      if (p1Symbol == data.native || p2Symbol == data.native) {
        toast.error("Two players cannot have same symbol");
        return;
      }
      localStorage.setItem("p3symbol", data.native);
      setP3Symbol(data.native);
      setEmojiPicker3(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Do you want to reset to default symbols?")) {
      localStorage.removeItem("p1symbol");
      localStorage.removeItem("p2symbol");
      localStorage.removeItem("p3symbol");
      setP1Symbol("X");
      setP2Symbol("O");
      setP3Symbol("Z");
    }
  };
  return (
    <>
      <Toaster />
      <h1 className="text-3xl font-mono flex justify-center">Settings</h1>
      <p className="flex justify-center">Set default player's symbol</p>

      <div className="mx-5 mt-5">
        <label className="text-2xl">Player One Symbol</label>
        <span className="text-2xl"> : {p1Symbol}</span>
        <div>
          <button
            className="p-2 my-1 rounded-lg bg-orange-500 text-orange-950"
            onClick={() => setEmojiPicker1(!emojiPicker1)}
          >
            Select P1 Symbol
          </button>
          {emojiPicker1 && (
            <Picker
              data={data}
              onEmojiSelect={(data) => handleEmoji(data, 1)}
            />
          )}
        </div>
      </div>

      <div className="mx-5 mt-5">
        <label className="text-2xl">Player Two Symbol</label>
        <span className="text-2xl"> : {p2Symbol}</span>
        <div>
          <button
            className="p-2 my-1 rounded-lg bg-orange-500 text-orange-950"
            onClick={() => setEmojiPicker2(!emojiPicker2)}
          >
            Select P2 Symbol
          </button>
          {emojiPicker2 && (
            <Picker
              data={data}
              onEmojiSelect={(data) => handleEmoji(data, 2)}
            />
          )}
        </div>
      </div>

      <div className="mx-5 mt-5">
        <label className="text-2xl">Player Three Symbol</label>
        <span className="text-2xl"> : {p3Symbol}</span>
        <div>
          <button
            className="p-2 my-1 rounded-lg bg-orange-500 text-orange-950"
            onClick={() => setEmojiPicker3(!emojiPicker3)}
          >
            Select P3 Symbol
          </button>
          {emojiPicker3 && (
            <Picker
              data={data}
              onEmojiSelect={(data) => handleEmoji(data, 3)}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center my-5">
        <button
          className="px-4 py-2 my-1 rounded-lg bg-orange-500 text-orange-950 mx-5"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="p-2 my-1 rounded-lg bg-orange-500 text-orange-950 mx-5"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>

      <div className="grid place-items-center">
        <h1 className="text-2xl">
          Created by{" "}
          <Link
            to="https://linkedin.com/in/nooruddin-shaikh"
            target="_blank"
            className="underline underline-offset-4 text-cyan-500"
          >
            Nooruddin Shaikh
          </Link>
        </h1>
        <Link
          to="https://github.com/noorudd-in/Advanced-Tic-Tac-Toe"
          target="_blank"
          className="underline underline-offset-4 text-cyan-500"
        >
          View Game Source Code
        </Link>
      </div>
    </>
  );
};

export default Settings;
