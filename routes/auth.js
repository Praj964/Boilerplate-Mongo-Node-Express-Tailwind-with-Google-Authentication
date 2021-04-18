const express = require('express');
const passport = require('passport');
const router = express.Router();

// Authentication with Google
// GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// Google Authenticate Callback
// GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
    (req, res) => {
        res.redirect('/dashboard')
    })


//Logout User
// /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})
module.exports = router;