import { useState } from "react";
// import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { increaseLike, deletedBlog } from "../reducers/blogReducer";

const Blog = ({
  blog,
  // setBlogs,
  loggedInUser,
  // handleLikes,
}) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [showDetails, setShowDetails] = useState("");
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  blogStyle.removebutton = {
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
    border: "solid",
  };

  const togglAble = () => {
    setShowDetails(!showDetails);
  };

  const handleLikes = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(id));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
  };

  // const handleDelete = async (blog) => {
  //   const confirmation = window.confirm(
  //     `Remove blog ${blog.title} by ${blog.author}`
  //   );
  //   if (confirmation) {
  //     try {
  //       await blogService.deleteBlog(blog.id);
  //       setBlogs((blogs) => blogs.filter((item) => item.id !== blog.id));
  //       dispatch(setNotification("Blog deleted successfully!", 3));
  //     } catch (error) {
  //       console.error("Error deleting blog:", error);
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    const confirmation = window.confirm(
      "Do you really want to remove this blog?"
    );
    if (confirmation) {
      dispatch(deletedBlog(id));
    }
    dispatch(setNotification(`${blogToRemove.title} deleted successfully!`, 3));
  };

  return (
    <div style={blogStyle} className="blog-div">
      <div>
        {blog.title}
        <div>{blog.author}</div>

        <button onClick={togglAble} id="view">
          {showDetails ? "Hide" : "View"}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button onClick={() => handleLikes(blog.id)} id="like-button">
              Like
            </button>
          </div>

          {blog.user.name}
          {console.log(loggedInUser, "loggedInUser")}
          {console.log(blog, "blog")}
          <div>
            {loggedInUser.id === blog.user ||
            loggedInUser.id === blog.user.id ? (
              <button
                onClick={() => handleDelete(blog.id)}
                style={blogStyle.removebutton}
                id="remove"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
export default Blog;
