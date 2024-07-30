import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter.toLowerCase());

  const anecdotes = useSelector((state) =>
    [...state.anecdotes]
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const { id, content } = anecdote;
    dispatch(increaseVote(id));
    dispatch(setNotification(`You voted '${content}'`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

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
