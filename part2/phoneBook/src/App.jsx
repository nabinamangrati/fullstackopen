import { useState, useEffect } from "react";
import Filter from "./component/Filter";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);

  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log("hello");
    let myAxiosPromise = axios.get("http://localhost:3001/persons");
    myAxiosPromise.then((myResult) => {
      console.log("returned promise");
      console.dir(myResult.data);
      setPersons(myResult.data);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      // Issue a warning if the name already exists
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");

      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {/* {persons.map((person, index) => (
          <div key={index}>
            {person.name} {person.number}
          </div>
        ))}
        <h2>Filtered Results</h2>
        <div> */}
        {filteredPersons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default App;
