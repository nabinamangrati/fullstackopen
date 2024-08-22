const app = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const { tokenExtractor } = require("../utils/middleware");

app.get("/", async (request, response, next) => {
  console.log(request.user, "request from the backend");
  let blogs = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
    })
    .sort({ likes: -1 });
  response.json(blogs);
  console.log(blogs, "request from frontend");

  next();
});
app.get("/:id", async (request, response, next) => {
  try {
    let result = await Blog.findById(request.params.id);

    if (result) {
      response.json(result);
      next();
    } else {
      response.end(`there is no blog on  ${request.params.id}`);
    }
  } catch (e) {
    next(e);
  }
});

app.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    console.log(process.env.SECRET, "process.env.SECRET");
    console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
    console.log(decodedToken, "decoded token");
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token not available" });
    }
    const body = request.body;

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user.id,
    });

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: "title or url is missing" });
    }
    if (blog.likes === undefined) {
      blog.likes = 0;
    }

    let result = await blog.save();
    console.log(result, "result");

    response.status(201).json(result);

    user.blog.push(result.id);
    await user.save();
  } catch (e) {
    next(e);
  }
});

app.delete("/:id", async (request, response) => {
  const id = request.params.id;
  console.log(id, "id of blog");

  //! Check if the request includes a valid token
  const token = request.token;
  console.log(request.token, "request token");
  if (!token) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  //! Verify the token and extract the user's id from it
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(decodedToken, "decodedtoekn");
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  //! Find the blog to be deleted
  const blog = await Blog.findById(id);
  console.log(id, "blog id");

  //! Check if the blog exists
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  console.log(blog, "blog");
  //! Check if the user trying to delete the blog is the creator of the blog
  if (blog.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: "Permission denied" });
  }

  try {
    await Blog.findByIdAndDelete(id);
    console.log(response, "response");
    response.status(200).json({ messgae: "blog deleted" });
  } catch (error) {
    response.status(400).json({ error: "Invalid blog id" });
  }
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
