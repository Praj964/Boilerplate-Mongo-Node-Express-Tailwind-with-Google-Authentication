const express = require('express');
const router = express.Router();

// Landing Page
router.get('/', (req, res) => res.render('landingPage'));

module.exports = router;