import { useState, useEffect } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Person from "./component/Person";
import phoneServices from "./services/phone";
import Notification from "./component/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    console.log("hello");
    let myAxiosPromise = phoneServices.getAll();
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
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update their number?`
      );
      setNotification(`old number of ${newName} is changed to ${newNumber}`);
      setTimeout(() => {
        setNotification("");
      }, 3000);

      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        };

        updateData(
          existingPerson.id,
          existingPerson.name,
          updatedPerson.number
        );

        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );

        setNewName("");
        setNewNumber("");
      }
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,

        id: `${persons.length + 1}`,
      };

      let postAxios = phoneServices.create(newPerson);
      postAxios
        .then((response) => {
          setPersons(persons.concat(response.data));
          console.dir(persons.concat(response.data));
          setNotification(` Added ${newName} `);
          setTimeout(() => {
            setNotification("");
          }, 3000);

          setNewName("");

          setNewNumber("");
        })
        .catch((error) => {
          setNotification(error.response.data.error);
        });
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const updateData = (id, newName, newNumber) => {
    let putAxios = phoneServices.update(id, {
      id: id,
      name: newName,

      number: newNumber,
    });
    putAxios
      .then((response) => {
        console.dir("response");
        let updatedPerson = response.data;
        if (response.status === 200) {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        } else {
          console.error("Error updating person:", response.data);
        }
      })
      .catch((error) => {
        setNotification(error.response.data.error);
      });
  };
  const deletePerson = (id) => {
    let deleteAxios = phoneServices.deletePerson(id);

    deleteAxios
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log(error);
        setNotification(
          `Information of ${newName} has already been deleted from the server`
        );
      });

    setTimeout(() => {
      setNotification("");
    }, 3000);
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
  const myStyle = { fontSize: "30px" };

  return (
    <div>
      <h2 style={myStyle} className="redcolor">
        Phonebook
      </h2>
      <Notification message={notification} />
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
