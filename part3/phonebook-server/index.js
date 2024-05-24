const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7,}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Phone number must be of the form XX-XXXXXXX or XXX-XXXXXXXX.`,
    },
    required: true,
    minLength: 8,
  },
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

app.get("/api/persons/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const count = persons.length;
    const requestTime = new Date();
    response.send(
      `<p>Phonebook has info for ${count} people</p>
          <p>${requestTime}</p>`
    );
  });
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
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
  // const myId = Number(request.params.id);

  // persons = persons.filter((person) => person.id !== myId);

  // response.status(202).send(`The person on id ${myId} has been deleted`);
  // //204 sends a message in browser and 202 doesnt send the messsge also send and end are different
  // // response.status(204).send(`The person on id ${myId} has been deleted`);
});
app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((e) => next(e));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
