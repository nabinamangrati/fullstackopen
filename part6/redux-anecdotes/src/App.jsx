import { useSelector, useDispatch } from "react-redux";
import {
  increaseVote,
  createAnecdotes,
  getId,
} from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(increaseVote(id));
  };
  const addAnecdotes = (event) => {
    event.preventDefault();
    console.dir(event.target.myInput.value);
    const newAnecdotes = {
      content: event.target.myInput.value,
      id: getId(),
      votes: 0,
    };
    dispatch(createAnecdotes(newAnecdotes));
    event.target.myInput.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div>
          <input name="myInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
