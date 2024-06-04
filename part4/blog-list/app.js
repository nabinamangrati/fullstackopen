const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsController = require("./controllers/blogs");
const usersController = require("./controllers/users");
const { mongoUrl } = require("./utils/config");

mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsController);
app.use("/api/users", usersController);

module.exports = app;
