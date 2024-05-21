const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const url = `mongodb+srv://nabina1:mypassword@cluster0.f3ksog1.mongodb.net/phonebookServer?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", phonebookSchema);

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [];
app.get("/api/persons/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
app.get("/info", (request, response) => {
  const count = persons.length;
  const requestTime = new Date();
  response.send(
    `<p>Phonebook has info for ${count} people</p>
        <p>${requestTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const myId = Number(request.params.id);
  const myPerson = persons.find((person) => person.id === myId);
  if (myPerson) {
    response.json(myPerson);
  } else {
    response.status(404).send(`There is no person with ID ${myId}`);
  }
});
app.delete("/api/persons/:id", (request, response) => {
  console.log(request, "request.body");
  const myId = Number(request.params.id);
  console.log(myId, "id");
  persons = persons.filter((person) => person.id !== myId);
  console.log(persons, "persons");

  response.status(202).send(`The person on id ${myId} has been deleted`);
  //204 sends a message in browser and 202 doesnt send the messsge also send and end are different
  // response.status(204).send(`The person on id ${myId} has been deleted`);
});
app.post("/api/persons/", (request, response) => {
  const myNewPost = request.body;

  if (!myNewPost.name || !myNewPost.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }

  const nameExists = persons.some((person) => person.name === myNewPost.name);
  if (nameExists) {
    return response.status(400).json({ error: "name must be unique" });
  }

  myNewPost.id = Math.floor(Math.random() * 1000000);

  persons.push(myNewPost);
  console.log(myNewPost);
  response.status(201).json(myNewPost);
});
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
