import { useState, useEffect } from "react";
import Filter from "./component/Filter";
import axios from "axios";
import PersonForm from "./component/PersonForm";
import Person from "./component/Person";
import phoneServices from "./services/phone";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("hello");
    let myAxiosPromise = phoneServices.getAll();
    myAxiosPromise.then((myResult) => {
      console.log("returned promise");
      console.dir(myResult.data);
      setPersons(myResult.data);
    });
  }, []);

  const filteredPersons = persons.filter(
    (person) =>
      person.name && person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.some((person) => person.name === newName)) {
      // Issue a warning if the name already exists
      alert(`${newName} is already added to the phonebook`);
    } else {
      let postAxios = phoneServices.create(newPerson);
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

  const updateData = (id, newName, newNumber) => {
    // let currentPerson = persons.find((person) => {
    //   return person.id === id;
    // });
    // let updatedPerson = { ...currentPerson };
    let putAxios = phoneServices.update(id, {
      id: id,
      name: newName,
      number: newNumber,
    });
    putAxios.then((response) => {
      console.dir("response");
      let updatedPerson = response.data;
      setPersons(
        persons.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        )
      );
    });
  };
  const deletePerson = (id) => {
    let deleteAxios = phoneServices.deletePerson(id);

    deleteAxios.then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const handleEdit = (event) => {
    const { name, value } = event.target;
    // const name = event.target.name;
    // const value =event.target.value;
    if (name === "name") {
      setNewName(value);
    } else if (name === "number") {
      setNewNumber(value);
    }
  };
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      deletePerson(id);
      alert(`${name} has been deleted.`);
    }
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
      <Person
        newName={newName}
        newNumber={newNumber}
        persons={filteredPersons}
        updateData={updateData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
