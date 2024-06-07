import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateOnlineState } from "../state/onlinePlayerSlice";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../constant";
import Modal from "./Modal";

const socket = io(SOCKET_URL, {
  autoConnect: true,
});

const Rooms = ({ mode, grid }) => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStart = () => {
    if (name == null || name == "") {
      toast.error("Name cannot be empty");
      return;
    }
    if (room == null || room == "") {
      toast.error("Enter room numer or room name");
      return;
    }
    socket.emit("join_room", {
      roomName: mode + grid + room,
      data: { name: name, grid: 3 },
    });
    socket.on(`created${mode + grid + room}`, () => {
      dispatch(
        updateOnlineState({
          data: new Array(grid * grid).fill(null),
          grid: grid,
          mode: mode,
          playerOne: name,
          playerTwo: null,
          myPlayerId: 1,
          room: mode + grid + room,
        })
      );
      navigate("/lobby");
    });
    socket.on(`joined${mode + grid + room}`, (message) => {
      let result = message[mode + grid + room];
      console.log(result);
      dispatch(
        updateOnlineState({
          data: new Array(grid * grid).fill(null),
          grid: grid,
          mode: mode,
          playerOne: result.p1.name == name ? name : result.p1.name,
          playerTwo: result.p2.name == name ? name : result.p2.name,
          myPlayerId: result.p1?.name == name ? 1 : 2,
          room: mode + grid + room,
        })
      );
      navigate("/game");
    });
    socket.on("full", (message) => alert(message));
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
          placeholder="Room Number or Name"
          className="text-black p-1 m-1 rounded-md bg-white"
          onChange={(e) => setRoom(e.target.value)}
        />
        <h1
          className="underline underline-offset-4 text-sm text-blue-500"
          onClick={() => setModal(true)}
        >
          What is room number or name?
        </h1>
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

      <Modal
        modal={modal}
        setModal={setModal}
        title="What is a room?"
        content="Enter room number or name to start the game. If room exist, you will be
        joined automatically else a new room will be created. A room can have
        maximum of two members."
      />
    </>
  );
};

export default Rooms;
