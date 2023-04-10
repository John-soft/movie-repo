//IMPORT PACKAGE
const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require("morgan");
const moviesRouter = require("./routes/moviesRoute");

const logger = function (req, res, next) {
  console.log("Custom middleware called");
  next();
};

const timeCreated = function (req, res, next) {
  req.requestedAt = new Date().toISOString();
  next();
};

//using middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static("./public"));
app.use(logger);
app.use(timeCreated);
app.use("/api/v1/movies", moviesRouter);
module.exports = app;
