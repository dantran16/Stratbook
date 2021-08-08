const express = require('express');
const router = express.Router();

const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

// User register route
router.route('/register')
  .get(users.renderRegisterPage)
  .post(catchAsync(users.register));

// User login route
router.route('/login')
  .get(users.renderLoginPage)
  .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout);

module.exports = router;