import React from "react";

import Blog from "../components/Blog";

const Home = ({ user, loginForm, handleLogout, blogForm, blogs }) => {
  return (
    <div>
      {user === null ? (
        <>
          <h2>Log into application</h2>

          {loginForm()}
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} loggedInUser={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
