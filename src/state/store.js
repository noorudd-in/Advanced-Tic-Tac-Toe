import { configureStore } from "@reduxjs/toolkit";
import twoPlayerReducer from "./twoPlayerSlice";
import gameSlice from "./gameSlice";

export const store = configureStore({
  reducer: {
    gameState: gameSlice,
  },
});
