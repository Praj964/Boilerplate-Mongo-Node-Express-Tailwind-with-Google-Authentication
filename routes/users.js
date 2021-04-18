const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Login Page
router.get('/login', ensureGuest,(req, res) => res.render('login'));

// signup Page
router.get('/signup',(req, res) => res.render('signup'));

//Dashboard Render
router.get('/dashboard', ensureAuth, (req,res) => {
    res.render('dashboard', {
        name: req.user.firstName
    })
})

module.exports = router;