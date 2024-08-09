import axios from "axios";
const baseUrl = "http://localhost:3003/anecdotes";

export const getAnecdotes = () =>
  axios.get(baseUrl).then((res) => {
    return res.data;
  });
export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);
