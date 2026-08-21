const Movie = require('../models/movie');
const Seat = require('../models/seat');

exports.getAddMoviePage = (req, res) => {
  res.render('addMovie');
}

exports.addMovie = async (req, res) => {
  try {
    const { title, showtime } = req.body;
    const movie = new Movie({ title, showtime });
    await movie.save();

    const seats = [];
    const rows = ['A', 'B', 'C', 'D'];

    for(const row of rows){
      for (let number = 1; number <= 6; number++){
        seats.push({
          seatNumber: `${row}${number}`,
          movieId: movie._id,
          isBooked: false
        });
      }
    }
    await Seat.insertMany(seats);
    res.redirect('/admin');
  } catch(error){
    console.log(error);
    res.status(500).send('Something went wrong...');
  }
}