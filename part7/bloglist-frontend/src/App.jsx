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
import { setUser } from "./reducers/userReducer";
import { Routes, Route, Link } from "react-router-dom";
import User from "./components/User";
import Home from "./home/Home";
import userService from "./services/users";
import { UserInfo } from "./components/UserInfo";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listOfUser, setListOfUser] = useState([]);

  const BlogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      let user = setUser(JSON.parse(loggedUserJSON));
      dispatch(setUser(user));
      blogService.setToken(user.token);
      fetchBlogs(user.token);
      dispatch(initializedBlog());
      console.log(loggedUserJSON, "loggedUserJSON");
    }
  }, []);

  useEffect(() => {
    userService.getAll().then((result) => {
      setListOfUser(result);
    });
  }, []);

  const fetchBlogs = async (token) => {
    try {
      const blogs = await blogService.getAll(token);
      // setBlogs(blogs);
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
      dispatch(setUser(user));
      console.log(user, "user from app");
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      fetchBlogs(user.token);
      setUsername("");
      setPassword("");
      dispatch(setNotification(`${user.name} has login successfully`, 3));
    } catch (error) {
      dispatch(setNotification("wrong username or password", 3));
      setUsername("");
      setPassword("");
    }
  };

  const handleAddblog = async (newBlog) => {
    try {
      await dispatch(handleAddBlog(newBlog));
      dispatch(setNotification(`Added new blog successfully`, 3));
    } catch (error) {
      dispatch(setNotification(`Error adding new blog`, 3));
    }
  };
  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(initializedBlog([]));

    // setBlogs([]);
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("user");
  };

  const loginForm = () => {
    return (
      <>
        <h2>login</h2>
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

  const padding = {
    padding: 5,
  };
  console.log(user, "user");
  return (
    <>
      <Notification />
      {console.log(user, "user")}
      <nav>
        <Link style={padding} to="/">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
      </nav>
      <Routes>
        <Route
          path="/users"
          element={
            <User
              listOfUser={listOfUser}
              user={user}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              user={user}
              loginForm={loginForm}
              handleLogout={handleLogout}
              blogForm={blogForm}
              blogs={blogs}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
