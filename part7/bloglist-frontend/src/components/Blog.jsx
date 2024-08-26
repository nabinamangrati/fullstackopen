import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { increaseLike, deletedBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog, loggedInUser }) => {
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
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button onClick={() => handleLikes(blog.id)} id="like-button">
              Like
            </button>
          </div>

          {blog.user.name}

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
