import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateOnlineState } from "../state/onlinePlayerSlice";
import { useNavigate } from "react-router-dom";
import { SOCKET_URL } from "../constant";

const socket = io(SOCKET_URL, {
  autoConnect: true,
});
const texts = [".", "..", "...", "....", "....."];

const WaitingForOpponent = () => {
  const [text, setText] = useState("Waiting for opponent .....");
  const [textId, setTextId] = useState(0);
  const onlineState = useSelector((state) => state.onlineState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on(`allJoined${onlineState?.room}`, (data) => {
      let result = data[onlineState.room];
      dispatch(
        updateOnlineState({
          data: onlineState.data,
          grid: onlineState.grid,
          mode: onlineState.mode,
          playerOne: onlineState.playerOne,
          playerTwo: result.p2.name,
          myPlayerId: 1,
          room: onlineState.room,
        })
      );
      navigate("/game");
    });
  }, [socket]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText("Waiting for opponent " + texts[textId % 5]);
      setTextId(textId + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [textId]);

  return (
    <>
      <h1 className="text-2xl flex justify-center mt-24 font-bold">{text}</h1>
      <h2 className="font-mono ml-10 mr-5 mt-1">
        Ask your friend to join the room with the following room details
      </h2>
      <div className="font-mono ml-10 mr-5 mt-2">
        <h1>
          Room Name/Number:{" "}
          <span className="font-semibold">
            {onlineState.room[0] == "b"
              ? onlineState.room.slice(6)
              : onlineState.room.slice(8)}
          </span>
        </h1>
        <h1>
          Mode:{" "}
          <span className="font-semibold">
            {onlineState.mode[0].toUpperCase() + onlineState.mode.slice(1)}
          </span>
        </h1>
        <h1>
          Grid:{" "}
          <span className="font-semibold">
            {onlineState.grid + " x " + onlineState.grid}
          </span>
        </h1>
      </div>
    </>
  );
};

export default WaitingForOpponent;
