import { useState, useEffect } from "react";
import Filter from "./component/Filter";
import axios from "axios";
import PersonForm from "./component/PersonForm";
import Person from "./component/Person";
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
    let newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      // Issue a warning if the name already exists
      alert(`${newName} is already added to the phonebook`);
    } else {
      let postAxios = axios.post("http://localhost:3001/persons", newPerson);
      postAxios.then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");

        setNewNumber("");
      });
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
      filter shown with
      <Filter value={search} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <div>
        <Person persons={filteredPersons} />
      </div>
    </div>
  );
};

export default App;
