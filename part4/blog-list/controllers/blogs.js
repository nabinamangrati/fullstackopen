const app = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

app.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});
app.get("/:id", async (request, response) => {
  try {
    let result = await Blog.findById(request.params.id);

    if (result) {
      response.json(result);
    } else {
      response.end(`there is no blog on  ${request.params.id}`);
    }
  } catch (e) {
    next(e);
  }
});

app.post("/", async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url is missing" });
  }
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

app.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

app.put("/:id", async (request, response) => {
  const body = request.body;

  console.log(request.params.id, "updated id");

  const blog = {
    likes: body.likes,
  };
  let result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(200).json(result).end();
  console.log(response, "rrsponse");
  user.blogs = user.blogs.concat(result.id);
});
module.exports = app;
