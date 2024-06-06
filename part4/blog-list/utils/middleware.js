// const jwt = require("jsonwebtoken");
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};
const myHandler = (error, request, response, next) => {
  console.error("error from nabina");
  next();
};
const another = (request, response, next) => {
  console.log("hello from nabina");
  next();
};
const myanother = (request, response, next) => {
  console.log("hello from nabina again");
  next();
};

const tokenExtractor = (request, response, next) => {
  console.log(request.token, "req token");
  const authorization = request.get("authorization");
  console.log(authorization, "authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};
const userExtractor = (request, response, next) => {
  console.log(request.token, "req token");
  const authorization = request.get("authorization");
  console.log(authorization, "authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  myHandler,
  another,
  myanother,
  userExtractor,
};
