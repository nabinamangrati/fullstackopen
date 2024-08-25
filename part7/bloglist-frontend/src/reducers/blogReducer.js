import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlog(state, action) {
      return action.payload;
    },
    voteOf(state, action) {
      const id = action.payload;
      const blogToLike = state.find((n) => n.id === id);
      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const blogToRemove = state.filter((blog) => blog.id !== id);
      return blogToRemove;
    },
  },
});

export const { appendBlog, setBlog, voteOf, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializedBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};
export const handleAddBlog = (blog) => {
  return async (dispatch) => {
    const token = localStorage.getItem("user");
    console.log("Retrieved token:", token);

    const newBlog = await blogService.create(blog, token);
    dispatch(appendBlog(newBlog));
  };
};
export const increaseLike = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getAll();
    const blogToLike = blog.find((blog) => blog.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };
    const response = await blogService.update(id, likedBlog);
    dispatch(voteOf(response.id));
  };
};
export const deletedBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};
