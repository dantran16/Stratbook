const { strategySchema } = require("./schemas.js");
const ExpressError = require('./utils/ExpressError.js');
const Strategy = require('./models/strategy');

module.exports.validateStrategy = (req, res, next) => {
  const { error } = strategySchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}