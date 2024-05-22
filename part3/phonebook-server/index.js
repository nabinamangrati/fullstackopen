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

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((myPerson) => {
      if (myPerson) {
        response.json(myPerson);
      } else {
        response
          .status(404)
          .send(`There is no person with ID ${request.params.id}`);
      }
    })
    .catch((e) => {
      next(e);
    });
});
app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((result) => {
    response.status(204).end();
  });
  // const myId = Number(request.params.id);

  // persons = persons.filter((person) => person.id !== myId);

  // response.status(202).send(`The person on id ${myId} has been deleted`);
  // //204 sends a message in browser and 202 doesnt send the messsge also send and end are different
  // // response.status(204).send(`The person on id ${myId} has been deleted`);
});
app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
