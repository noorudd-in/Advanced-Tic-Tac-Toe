import { configureStore } from "@reduxjs/toolkit";
import onlinePlayerSlice from "./onlinePlayerSlice";
import gameSlice from "./gameSlice";

export const store = configureStore({
  reducer: {
    gameState: gameSlice,
    onlineState: onlinePlayerSlice,
  },
});
