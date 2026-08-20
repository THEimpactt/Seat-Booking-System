const Movie = require('../models/movie');

exports.mainDashboard = async (req, res) => {
  const movies = await Movie.find();
  res.render('dashboard', {
    isLoggedin: req.session.isLoggedin || false,
    movies
  });
};