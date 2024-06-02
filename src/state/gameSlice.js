import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  grid: 3,
  mode: "basic",
  players: 2,
  playersName: { p1: "", p2: "", p3: "" },
};

export const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    updateGameState: (state, action) => {
      state.data = action.payload.data;
      state.players = action.payload.players;
      state.grid = action.payload.grid;
      state.mode = action.payload.mode;
      state.playersName = action.payload.playersName;
    },
  },
});

export const { updateGameState } = gameSlice.actions;
export default gameSlice.reducer;
