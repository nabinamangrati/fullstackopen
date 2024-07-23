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
app.use(middleware.userExtractor);

app.use("/api/blogs", blogsController);
app.use("/api/users", usersController);
app.use("/api/login", loginController);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.errorHandler);
app.use(middleware.myHandler);

app.use(middleware.another);
app.use(middleware.myanother);
console.log("app");
module.exports = app;
