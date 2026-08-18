const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
  seatNumber: {
    unique: true,
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  }
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;  