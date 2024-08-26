import React from "react";

import Blog from "../components/Blog";

const Home = ({ user, loginForm, handleLogout, blogForm, blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} loggedInUser={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
