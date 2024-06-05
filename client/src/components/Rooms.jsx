import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
const socket = io("http://localhost:3001", {
  autoConnect: true,
});

const Rooms = () => {
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room == null || room == "") {
      toast.error("Enter room name or number");
    }
    socket.emit("join_room", room);
    socket.on(`created${room}`, (message) => {
      localStorage.setItem("toastSuccess", "Created a new room");
      localStorage.setItem("room", room);
      localStorage.setItem("roomType", "new");
      navigate("/online");
    });
    socket.on(`joined${room}`, (message) => {
      localStorage.setItem("toastSuccess", "Created a new room");
      localStorage.setItem("room", room);
      localStorage.setItem("roomType", "old");
      navigate("/online");
    });
    socket.on("full", (message) => alert(message));
  };

  useEffect(() => {
    socket.on("join", (data) => alert(data));
  }, [socket]);
  return (
    <>
      <h1 className="text-center m-5 font-semibold">
        To start a game, you need to enter a room number or name to join. If
        room exist, you will be joined else a new room will be created. A room
        can have maximum two members.
      </h1>
      <div className="grid place-items-center mt-5">
        <input
          placeholder="Room Number or Name"
          className="text-black p-1 m-1 rounded-md bg-white"
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>

      <div className="grid place-items-center mt-5 mb-10">
        <button
          className="p-2 m-2 text-xl rounded-lg bg-orange-500 text-orange-950"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <button
          className="p-2 m-2 text-xl rounded-lg bg-orange-500 text-orange-950"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>

      <div>{message}</div>
    </>
  );
};

export default Rooms;
