import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateOnlineState } from "../../state/onlinePlayerSlice";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  autoConnect: true,
});

const SelectOnlineLevel = () => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    let gridSize = 3;
    let data = new Array(gridSize * gridSize).fill(null);
    dispatch(
      updateOnlineState({
        data: data,
        grid: gridSize,
        mode: "basic",
        playerOne: null,
        playerTwo: null,
      })
    );
    socket.emit("join_room", { roomName: room, data: { name: name, grid: 3 } });
    socket.on(`created${room}`, (message) => {
      console.log(message);
      navigate("/online");
    });
    socket.on(`joined${room}`, (message) => {
      console.log(message);
      navigate("/online");
    });
    socket.on("full", (message) => alert(message));
    //navigate("/game");
  };

  return (
    <>
      <Toaster />
      <div className="grid place-items-center mt-5">
        <input
          placeholder="Enter your name"
          className="text-black p-1 m-1 rounded-md bg-white"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter your name"
          className="text-black p-1 m-1 rounded-md bg-white"
          onChange={(e) => setRoom(e.target.value)}
        />
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

export default SelectOnlineLevel;
