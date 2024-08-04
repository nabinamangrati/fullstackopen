import { useDispatch } from "react-redux";
import { createAnecdoteAsync } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdotes = (event) => {
    event.preventDefault();
    console.dir(event.target.myInput.value);
    const content = event.target.myInput.value;
    event.target.myInput.value = "";
    dispatch(createAnecdoteAsync(content));
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
