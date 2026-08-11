const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboardController');

dashboardRouter.get('/', dashboardController.mainDashboard);

module.exports = dashboardRouter;