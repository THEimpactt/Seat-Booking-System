const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

adminRouter.get('/admin', adminController.getAdminPage);
adminRouter.post('/delete-movie/:id', adminController.deleteMovie);

module.exports = adminRouter;