import React from "react";

const Filter = ({ search, onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={onChange}
        value={search}
      />
    </div>
  );
};
export default Filter;
