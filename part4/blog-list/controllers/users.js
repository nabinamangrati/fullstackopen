const app = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

app.get("/", async (request, response) => {
  let result = await User.find({}).populate("blog", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  console.log(result, "result");
  response.json(result);
});

app.get("/:id", async (request, response) => {
  try {
    let result = await User.findById(request.params.id);

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
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    let result = await user.save();
    response.set("Content-Type", "application/json").status(201).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
