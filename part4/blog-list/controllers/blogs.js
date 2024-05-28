const app = require("express").Router();
const Blog = require("../models/blog");
app.get("/", async (request, response) => {
  let blogs = await Blog.find({});
  response.json(blogs);
});

app.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  try {
    let result = await blog.save();
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});
module.exports = app;
