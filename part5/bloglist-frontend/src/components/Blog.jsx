import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, setBlogs, loggedInUser }) => {
  console.log(blog, "from blog");
  console.log(loggedInUser, "user");
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

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        console.log(blog.id, "blogid from blog.jsx");
        setBlogs((blogs) => blogs.filter((item) => item.id !== blog.id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };
  loggedInUser = JSON.parse(localStorage.getItem("user"));
  console.log("Logged in user:", loggedInUser.user);
  console.log("Blog user:", blog.user);
  return (
    <div style={blogStyle} className="blog-div">
      <div>
        {blog.title}
        <button onClick={togglAble} id="view">
          {showDetails ? "Hide" : "View"}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button onClick={() => handleLikes(blog)} id="like-button">
              Like
            </button>
          </div>
          <div>{blog.author}</div>
          {blog.user.name}
          <div>
            {loggedInUser.username === blog.user.username ? (
              <button
                onClick={() => handleDelete(blog)}
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
