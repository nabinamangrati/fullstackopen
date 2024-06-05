const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsController = require("./controllers/blogs");
const usersController = require("./controllers/users");
const loginController = require("./controllers/login");
const { mongoUrl } = require("./utils/config");
// const { errorHandler, tokenExtracter } = require("./utils/middleware");
const middleware = require("./utils/middleware");
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogsController);
app.use("/api/users", usersController);
app.use("/api/login", loginController);
app.use(middleware.errorHandler);

module.exports = app;
