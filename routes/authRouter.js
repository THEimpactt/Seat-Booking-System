const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.isLoggedin);
authRouter.get('/logout', authController.logout);

module.exports = authRouter;