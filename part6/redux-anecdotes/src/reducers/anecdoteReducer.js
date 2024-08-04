import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { upVoteAnecdote } from "../services/anecdotes";

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
        anecdote.id === action.payload.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const voteAnecdote = (anecdoteToUpdate) => {
  return async (dispatch) => {
    const response = await upVoteAnecdote(anecdoteToUpdate);
    dispatch(increaseVote(response));
  };
};

const { createAnecdote, increaseVote, setAnecdotes } = anecdoteReducer.actions;
export { createAnecdote, increaseVote };
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdoteAsync = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0,
      };
      const result = await anecdoteService.createNew(newAnecdote);
      dispatch(createAnecdote(result));
    } catch (error) {
      console.error("Failed to create anecdote:", error);
    }
  };
};
export default anecdoteReducer.reducer;
