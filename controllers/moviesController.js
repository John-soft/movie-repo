const Movie = require("./../models/movieModel");

//ROUTE HANDLER FUNCTIONS
const getAllMovies = async (req, res) => {
  try {
    console.log(req.query);
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);
    //console.log(queryObj);

    const movies = await Movie.find(queryObj);

    // const movies = await Movie.find()
    //   .where("duration")
    //   .gte(req.query.duration)
    //   .where("ratings")
    //   .gte(req.query.ratings)
    //   .where("price")
    //   .lte(req.query.price);
    res.status(200).json({
      status: "Success",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const getMovie = async (req, res) => {
  //const movie = await Movie.find({_id: req.params.id});

  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "Successful",
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      status: "Success",
      data: {
        movie: updatedMovie,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//module.exports
module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
