const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogController = require("./controllers/blogs");
const { mongoUrl } = require("./utils/config");

mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogController);

module.exports = app;
