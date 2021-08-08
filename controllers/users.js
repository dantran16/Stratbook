const User = require('../models/user');

module.exports.renderRegisterPage = (req, res) => {
  res.render('users/register')
}

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.flash('success', 'You are signed up!');
    res.redirect('/')
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
}