const express = require('express');
const path = require('path');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');


// Route to serve the authentication page
router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth/auth.html'));
});

// Route for the root URL - redirect to auth page
router.get('/', (req, res) => {
  res.redirect('/auth');
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard/dashboard.html'));
});

module.exports = router;