const Movie = require('../models/movie');

exports.getAdminPage = async (req, res) => {
  const movies = await Movie.find();
  res.render('adminPage', { isLoggedin: req.session.isLoggedin || false, movies });
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.body;
  await Movie.findByIdAndDelete(id);
  res.redirect('/admin');
}