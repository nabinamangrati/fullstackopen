import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createNew = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};
export const upVoteAnecdote = async (anecdoteToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${anecdoteToUpdate.id}`,

    anecdoteToUpdate
  );

  return response.data;
};

export default {
  getAll,
  createNew,
};
