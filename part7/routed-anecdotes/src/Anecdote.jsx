import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id == id);
  return (
    <>
      <h1>this is single anecdote for {id}</h1>
      <div>
        has {anecdote.votes} votes
        <div>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </div>
      </div>
    </>
  );
};
export default Anecdote;
