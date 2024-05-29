const app = require("express").Router();
const Blog = require("../models/blog");
app.get("/", async (request, response) => {
  let blogs = await Blog.find({});
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
  const blog = new Blog(request.body);
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
});
module.exports = app;
