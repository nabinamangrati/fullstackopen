import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user, "user");
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user, "user");
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    setUsername("");
    setPassword("");
  };
  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  // <h2>blogs</h2>;
  // {
  //   blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
  // }
  return (
    <>
      <h2>Blogs</h2>
      {user !== null && (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {user === null && loginForm()}

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  );
};

export default App;
