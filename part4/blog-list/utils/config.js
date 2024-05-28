require("dotenv").config();

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TESTDB_URL
    : process.env.MONGO_URL;
const PORT = process.env.PORT;
module.exports = { mongoUrl, PORT };
