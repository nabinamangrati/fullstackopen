import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, contextDispatch] = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const returnAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        returnAnecdotes.concat(newAnecdote)
      );
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;

    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters long.");
      return;
    }
    const anecdoteToAdd = { content, votes: 0 };
    newAnecdoteMutation.mutate(anecdoteToAdd);
    event.target.newAnecdote.value = "";
    contextDispatch({
      type: "SET_NOTIFICATION",
      payload: `anecdote '${content}' is added`,
    });
    setTimeout(() => {
      contextDispatch({
        type: "RESET_NOTIFICATION",
      });
    }, 2000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
