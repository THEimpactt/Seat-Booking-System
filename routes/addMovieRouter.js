const express = require('express');
const addMovieRouter = express.Router();
const addMovieController = require('../controllers/addMovieController');

addMovieRouter.get('/add-movie', addMovieController.getAddMoviePage);
addMovieRouter.post('/add-movie', addMovieController.addMovie);

module.exports = addMovieRouter;