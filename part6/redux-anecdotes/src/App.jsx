import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "./request";
import { setAnecdotes } from "./reducers/anecdoteReducer";
const App = () => {
  const dispatch = useDispatch();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.status === "error") {
    return <div>anecdotes service is not available due to server problem</div>;
  }

  const anecdotes = result.data;

  dispatch(setAnecdotes(anecdotes));
  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
