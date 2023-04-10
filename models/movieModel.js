const mongoose = require("mongoose");

//Create Movie Schema
const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required!"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description field is required!"],
    trim: true,
  },
  duration: { type: Number, required: [true, "Duration field is required!"] },
  ratings: {
    type: Number,
  },
  totalRatings: {
    type: Number,
  },

  releaseYear: {
    type: Number,
    required: [true, "ReleaseYear field is required!"],
  },
  releaseDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
    required: [true, "Genres is required"],
  },
  directors: {
    type: [String],
    required: [true, "Directors is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  actors: {
    type: [String],
    required: [true, "actors is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});

//Create the movie model
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
