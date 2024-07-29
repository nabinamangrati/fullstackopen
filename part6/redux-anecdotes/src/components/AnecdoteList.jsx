import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  // 1. Extract the filter state from Redux store and convert it to lowercase
  const filter = useSelector((state) => state.filter.toLowerCase());

  // 2. Extract and filter anecdotes based on the filter state
  const anecdotes = useSelector(
    (state) =>
      state.anecdotes
        .filter(
          (anecdote) => anecdote.content.toLowerCase().includes(filter) // Filter based on content
        )
        .sort((a, b) => b.votes - a.votes) // Sort by votes
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
