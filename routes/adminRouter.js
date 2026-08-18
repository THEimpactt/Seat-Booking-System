const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get('/admin', adminController.getAdminPage);

module.exports = adminRouter;