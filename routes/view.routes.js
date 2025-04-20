const express = require('express');
const path = require('path');
const router = express.Router();

// Route to serve the authentication page
router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth/auth.html'));
});

// Route for the root URL - redirect to auth page
router.get('/', (req, res) => {
  res.redirect('/auth');
});

module.exports = router;