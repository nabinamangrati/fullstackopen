import React from "react";
const Person = ({
  newName,
  newNumber,
  persons,
  updateData,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
          {/* <input type="text" name="name" onChange={handleEdit} />
          <input type="text" name="number" onChange={handleEdit} />
          <button onClick={() => updateData(person.id, newName, newNumber)}>
            edit
          </button> */}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Person;
