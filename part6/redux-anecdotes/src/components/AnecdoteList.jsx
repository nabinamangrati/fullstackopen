import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter.toLowerCase());

  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(increaseVote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
