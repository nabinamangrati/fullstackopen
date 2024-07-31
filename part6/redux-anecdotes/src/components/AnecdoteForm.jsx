import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { getId } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdotes = (event) => {
    event.preventDefault();
    console.dir(event.target.myInput.value);
    const newAnecdotes = {
      content: event.target.myInput.value,
      id: getId(),
      votes: 0,
    };
    anecdoteService.createNew(newAnecdotes).then((myAnecdote) => {
      dispatch(createAnecdote(myAnecdote));
    });
    event.target.myInput.value = "";
  };
  return (
    <div>
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
export default AnecdoteForm;
