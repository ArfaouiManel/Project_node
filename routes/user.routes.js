const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { isAuthenticated , isAdmin} = require('../middlewares/auth.middleware');

// User Routes
router.put('/updateProfile', isAuthenticated, userController.updateProfile);
router.put('/updatePassword', isAuthenticated, userController.updatePassword);
router.get('/', isAuthenticated, isAdmin, userController.getAllUsers);


module.exports = router;
