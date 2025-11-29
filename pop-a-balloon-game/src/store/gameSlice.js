import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    level: 1,
    targetColor: "red",
    correctHits: 0,
    reactionTimes: []
  },
  reducers: {
    nextLevel: (state) => { state.level++; },
    addCorrectHit: (state) => { state.correctHits++; },
    addReaction: (state, action) => { state.reactionTimes.push(action.payload); },
    resetLevel: (state) => {
      state.correctHits = 0;
      state.reactionTimes = [];
    }
  }
});

export const { nextLevel, addCorrectHit, addReaction, resetLevel } =
  gameSlice.actions;

export default gameSlice.reducer;
