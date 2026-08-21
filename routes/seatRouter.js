const express = require('express');
const seatRouter = express.Router();
const seatController = require('../controllers/seatController');

seatRouter.get('/movie/:id/seats', seatController.getSeatsPage);
seatRouter.post('/movie/:id/book', seatController.bookSeats);

module.exports = seatRouter;