const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Movie = require("./../models/movieModel");

dotenv.config({ path: "./config.env" });

//CONNECT TO MONGODB
mongoose
  .connect(process.env.CONN_STR, { useNewUrlParser: true })
  .then((conn) => {
    //console.log(conn);
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(`Database Connection Error ${err}`);
  });

//READ CUSTOMER.JSON FILE
const movies = JSON.parse(fs.readFileSync("./data/customer.json", "utf-8"));

//DELETE EXISTING DATA IN THE DATABASE

const deleteMovies = async () => {
  try {
    Movie.deleteMany();
    console.log("Movies Database Deleted Successfully");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

const importMovies = async () => {
  try {
    await Movie.create(movies);
    console.log("Data successfully imported");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importMovies();
}

if (process.argv[2] === "--delete") {
  deleteMovies();
}
