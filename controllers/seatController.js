const Movie = require("../models/movie");
const Seat = require("../models/seat");

exports.getSeatsPage = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    const seats = await Seat.find({ movieId: id }).sort({ seatNumber: 1 });

    res.render("seatsPage", {
      isLoggedin: req.session.isLoggedin || false,
      movie,
      seats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong...");
  }
};

exports.bookSeats = async (req, res) => {
  try {
    if (!req.session.isLoggedin) {
      return res.status(401).send("You must be logged in to book seats");
    }
    const { seatIds } = req.body;
    if (!Array.isArray(seatIds) || seatIds.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: "No seats selected" });
    }

    const bookedSeats = [];
    for (const seatId of seatIds) {
      const updated = await Seat.findOneAndUpdate(
        { _id: seatId, isBooked: false },
        { isBooked: true, bookedBy: req.session.user.id },
        { returnDocument: 'after' }
      );
      if (updated) {
        bookedSeats.push(updated);
      }
    }

    if (bookedSeats.length < seatIds.length) {
      await Seat.updateMany(
        { _id: { $in: bookedSeats.map((s) => s._id) } },
        { isBooked: false, $unset: { bookedBy: "" } },
      );
      return res
        .status(409)
        .json({
          success: false,
          message:
            "Some seats were just booked by someone else. Please reselect.",
        });
    }

    res.json({ success: true, message: "Booking confirmed!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong..." });
  }
};
