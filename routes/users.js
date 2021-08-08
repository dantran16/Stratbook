const express = require('express');
const router = express.Router();

const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
  .get(users.renderRegisterPage)
  .post(catchAsync(users.register));

module.exports = router;