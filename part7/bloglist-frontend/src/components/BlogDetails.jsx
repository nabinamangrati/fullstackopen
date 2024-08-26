import React from "react";
import { increaseLike } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

export const BlogDetails = ({ singleBlog, blogs }) => {
  const dispatch = useDispatch();

  const handleLikes = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(id));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
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
    </div>
  );
};
