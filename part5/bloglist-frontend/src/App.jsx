import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //new blog state
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      fetchBlogs(user.token);
    }
  }, []);

  const fetchBlogs = async (token) => {
    try {
      const blogs = await blogService.getAll(token);
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      fetchBlogs(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("Wrong credentials");
      console.error("Login error:", exception);
    }
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    //send new blogs to backend
    const createdBlog = await blogService.create(newBlog);

    //add new blogs to blogs state
    setBlogs([...blogs, createdBlog]);
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("user");
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
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setnewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setnewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setnewBlogUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
      <br />

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  );
};

export default App;
