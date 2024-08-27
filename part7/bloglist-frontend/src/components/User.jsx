import React from "react";
// import { UserInfo } from "./UserInfo";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
const User = ({ listOfUser, user, handleLogout }) => {
  console.log(user, "user from user");
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>Users</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {listOfUser.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blog.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
