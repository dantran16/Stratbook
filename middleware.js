const { strategySchema } = require("./schemas.js");
const ExpressError = require('./utils/ExpressError.js');
const Strategy = require('./models/strategy')

module.exports.validateStrategy = (req, res, next) => {
  const object = { "strategy": req.body.strategy };
  const { error } = strategySchema.validate(object);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  }
  next();
}