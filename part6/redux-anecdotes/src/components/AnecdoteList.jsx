import { useSelector, useDispatch } from "react-redux";
// import { voteAnecdote } from "../reducers/anecdoteReducer";
import { upVoteAnecdote } from "../services/anecdotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter.toLowerCase());
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: upVoteAnecdote,
    onSuccess: (newAnecdote) => {
      const returnAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        returnAnecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      );
    },
  });
  const vote = (anecdote) => {
    const { content } = anecdote;
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(anecdoteToUpdate);
    dispatch(notificationTimeout(`you voted '${content}'`, 1));
  };

  // const vote = (anecdote) => {
  //   const { content } = anecdote;
  //   const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
  //   dispatch(voteAnecdote(anecdoteToUpdate));
  //   dispatch(notificationTimeout(`you voted '${content}'`, 10));
  // };

  const anecdotes = useSelector((state) => {
    return [...state.anecdotes]
      .filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter);
      })
      .sort((a, b) => b.votes - a.votes);
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
