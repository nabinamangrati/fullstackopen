import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

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
