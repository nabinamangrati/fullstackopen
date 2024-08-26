import React from "react";
// import { UserInfo } from "./UserInfo";
const User = ({ listOfUser, user, handleLogout }) => {
  console.log(user, "user from user");
  return (
    <div>
      <h2>Users</h2>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {listOfUser.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blog.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
