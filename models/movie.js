const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  showtime:{
    type: String,
    required: true
  },
  totalSeats:{
    type: Number,
    required: true,
  }
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;