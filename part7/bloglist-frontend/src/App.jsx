import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializedBlog, handleAddBlog } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [notification, setNotification] = useState("");
  const [error, setErrorMessage] = useState("");

  const BlogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      // fetchBlogs(user.token);
      dispatch(initializedBlog());
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
      console.log(user, "user form app");
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
      setUsername("");
      setPassword("");
    }
  };
  const handleLikes = async (blogs) => {
    const blogToUpdate = { ...blogs, likes: blogs.likes + 1 };
    try {
      const response = await blogService.update(blogToUpdate.id, blogToUpdate);
      console.log(response, "response from Blog.jsx");
      setBlogs((prev) => {
        return prev.map((oldblogs) => {
          if (oldblogs.id === response.id) {
            return response;
          }
          return oldblogs;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleAddBlog = async (newBlog) => {
  //   BlogFormRef.current.toggleVisibility();
  //   try {
  //     //send new blogs to backend
  //     const createdBlog = await blogService.create(newBlog);
  //     //add new blogs to blogs state
  //     setBlogs([...blogs, createdBlog]);

  //     setNotificationMessage(
  //       `a new blog "${createdBlog.title}"by ${createdBlog.author} added`
  //     );
  //   } catch (error) {
  //     // Set error notification
  //     setNotificationMessage("Failed to add new blog");
  //     console.error("Add blog error:", error);
  //   }
  // };
  const handleAddblog = async (newBlog) => {
    try {
      await dispatch(handleAddBlog(newBlog));
      dispatch(setNotification(`Added new blog successfully`, 3));
    } catch (error) {
      dispatch(setNotification(`Error adding new blog`, 3));
    }
  };
  const handleLogout = () => {
    setUser(null);
    // setBlogs([]);
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("user");
  };

  // const setNotificationMessage = (message) => {
  //   setNotification(message);
  //   setTimeout(() => {
  //     setNotification("");
  //   }, 5000); // Clear notification after 5 seconds
  // };

  const loginForm = () => {
    return (
      <>
        <h2>login</h2>
        <Notification />
        <Togglable buttonLabel="show login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </>
    );
  };
  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={BlogFormRef}>
        <BlogForm handleAddBlog={handleAddblog} />
      </Togglable>
    );
  };

  return (
    <>
      <Notification />
      <h2>Blogs</h2>
      {/* {error && <div className="errorMessage">{error}</div>} */}
      {/* {notification && <div className="notification">{notification}</div>} */}
      {user !== null && (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout} id="logout-button">
            Logout
          </button>
        </div>
      )}
      {user === null && loginForm()}
      {user !== null && blogForm()}

      <ul>
        {blogs
          // .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              // setBlogs={setBlogs}
              loggedInUser={user}
              handleLikes={handleLikes}
            />
          ))}
      </ul>
    </>
  );
};

export default App;
