const Movie = require('../models/movie');

exports.getAddMoviePage = (req, res) => {
  res.render('addMovie');
}

exports.addMovie = async (req, res) => {
  const { title, showtime, totalSeats } = req.body;
  const movie = new Movie({ title, showtime, totalSeats });
  await movie.save();
  res.redirect('/admin');
}