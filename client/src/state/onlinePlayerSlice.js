import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  grid: 3,
  mode: null,
  playerOne: null,
  playerTwo: null,
  myPlayerId: null,
  room: null,
};

export const onlinePlayerSlice = createSlice({
  name: "onlinePlayer",
  initialState,
  reducers: {
    updateOnlineState: (state, action) => {
      state.data = action.payload.data;
      state.grid = action.payload.grid;
      state.mode = action.payload.mode;
      state.playerOne = action.payload.playerOne;
      state.playerTwo = action.payload.playerTwo;
      state.myPlayerId = action.payload.myPlayerId;
      state.room = action.payload.room;
    },
  },
});

export const { updateOnlineState } = onlinePlayerSlice.actions;
export default onlinePlayerSlice.reducer;
