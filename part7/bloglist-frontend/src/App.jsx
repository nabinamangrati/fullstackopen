import { useState, useEffect, useRef } from "react";
// import Blog from "./components/Blog";
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
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import User from "./components/User";
import Home from "./home/Home";
import userService from "./services/users";
import { ListOfUser } from "./components/ListOfUser";
import { BlogDetails } from "./components/BlogDetails";
import { Navigation, Page } from "./components/Button";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listOfUser, setListOfUser] = useState([]);

  const BlogFormRef = useRef();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      fetchBlogs(user.token);
      dispatch(initializedBlog());
    }
  }, []);

  useEffect(() => {
    userService.getAll().then((result) => {
      setListOfUser(result);
    });
  }, []);

  const matchUser = useMatch("/users/:id");

  const singleUser = matchUser
    ? listOfUser.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const singleBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const fetchBlogs = async (token) => {
    try {
      const blogs = await blogService.getAll(token);
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
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
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
    window.localStorage.removeItem("user");
    dispatch(initializedBlog([]));

    // setBlogs([]);
    setUsername("");
    setPassword("");
    dispatch(setUser(null));
    navigate("/");
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
            user={user}
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
  return (
    <Page>
      <div className="container">
        <Notification />
        <Navigation>
          <Link style={padding} to="/">
            Blogs
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
        </Navigation>
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
            path="/users/:id"
            element={<ListOfUser singleUser={singleUser} />}
          />
          <Route
            path="blogs/:id"
            element={<BlogDetails singleBlog={singleBlog} blogs={blogs} />}
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
      </div>
    </Page>
  );
};

export default App;
