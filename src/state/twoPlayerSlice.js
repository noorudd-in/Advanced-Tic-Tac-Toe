import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [null, null, null, null, null, null, null, null, null],
};

export const twoPlayerSlice = createSlice({
  name: "twoPlayer",
  initialState,
  reducers: {
    addMove: (state, action) => {
      state.data[action.payload.id] = action.payload.move;
    },
  },
});

export const { addMove } = twoPlayerSlice.actions;
export default twoPlayerSlice.reducer;
