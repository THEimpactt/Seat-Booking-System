const Movie = require('../models/movie');

exports.mainDashboard = async (req, res) => {
  const movie = await Movie.findOne(); // or findById if you know the ID
  res.render('dashboard', {
    isLoggedin: req.session.isLoggedin || false,
    movie
  });
};