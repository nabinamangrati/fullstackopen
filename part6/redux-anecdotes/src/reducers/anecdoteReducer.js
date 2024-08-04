import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
      return state.concat(action.payload);
    },
    increaseVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { createAnecdote, increaseVote, setAnecdotes } = anecdoteReducer.actions;
export { createAnecdote, increaseVote };
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteReducer.reducer;
