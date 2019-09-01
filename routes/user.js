const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('user/register.ejs', { title: 'Register page' });
});
router.get('/login', (req, res) => {
  res.render('user/login.ejs', { title: 'Login page' });
});
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    req.flash('error', 'Username was used');
    return res.render('register', { error: 'Username was used' });
  } else {
    const newUser = new User({
      username,
      password
    });
    await newUser.save();
    req.flash('success', 'Please login with your account');
    return res.redirect('/user/login');
  }
});
router.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash    : true 
}));
router.get('/profile', (req, res) => {
  res.render('user/profile', { title : "Profile page"  });
});

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', 'Logged out')
    res.redirect('/');
});

module.exports = router;
