import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { increaseLike } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

export const BlogDetails = ({ singleBlog, blogs }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/blogs/${singleBlog.id}/comments`)
      .then((result) => {
        setComments(result.data);
      });
  }, []);

  const handleLikes = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(id));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3003/api/blogs/${singleBlog.id}/comments`, {
        content: newComment,
      })
      .then((response) => {
        setComments(comments.concat(response.data));
        console.log(response.data.content, "response.data");
        setNewComment("");
      });
  };

  return (
    <div>
      <h1>{singleBlog.title}</h1>
      <a href={singleBlog.url}>{singleBlog.url}</a>

      <div>
        {singleBlog.likes} likes
        <button
          onClick={() => {
            handleLikes(singleBlog.id);
          }}
        >
          like
        </button>
      </div>
      <strong>added by {singleBlog.author}</strong>
      <div>
        <strong>comments</strong>
        <br />
        <ul>
          {comments.map((comment) => {
            return <li key={comment.id}>{comment.content}</li>;
          })}
        </ul>
        <form onSubmit={handleAddComment}>
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            type="text"
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
