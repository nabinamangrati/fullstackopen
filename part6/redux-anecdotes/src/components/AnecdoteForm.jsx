import { createAnecdotes } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
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
    dispatch(createAnecdotes(newAnecdotes));
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
