import { createSlice } from "@reduxjs/toolkit";

export const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, ...action.payload];
    },
    increaseVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
  },
});

const { createAnecdote, increaseVote } = anecdoteReducer.actions;
export { createAnecdote, increaseVote };

export default anecdoteReducer.reducer;
