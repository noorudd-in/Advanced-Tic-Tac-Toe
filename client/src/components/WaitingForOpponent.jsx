import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateOnlineState } from "../state/onlinePlayerSlice";
import { useNavigate } from "react-router-dom";
import { SOCKET_URL } from "../constant";

const socket = io(SOCKET_URL, {
  autoConnect: true,
});

const WaitingForOpponent = () => {
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

  return (
    <>
      <h1>Waiting...</h1>
    </>
  );
};

export default WaitingForOpponent;
