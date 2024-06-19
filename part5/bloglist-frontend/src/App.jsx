import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //new blog state
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setErrorMessage] = useState("");

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
    } catch (error) {
      setErrorMessage(`Wrong username or password`);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    try {
      //send new blogs to backend
      const createdBlog = await blogService.create(newBlog);

      //add new blogs to blogs state
      setBlogs([...blogs, createdBlog]);
      setnewBlogTitle("");
      setnewBlogAuthor("");
      setnewBlogUrl("");
      setNotificationMessage(
        `a new blog "${createdBlog.title}"by ${createdBlog.author} added`
      );
    } catch (error) {
      // Set error notification
      setNotificationMessage("Failed to add new blog");
      console.error("Add blog error:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBlogs([]);
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("user");
  };

  const setNotificationMessage = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000); // Clear notification after 5 seconds
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
  const blogForm = () => {
    return (
      <div>
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
      </div>
    );
  };

  return (
    <>
      <h2>Blogs</h2>
      {error && <div className="errorMessage">{error}</div>}
      {notification && <div className="notification">{notification}</div>}
      {user !== null && (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {user === null && loginForm()}
      {user !== null && blogForm()}

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  );
};

export default App;
