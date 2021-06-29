const Joi = require('joi');

module.exports.strategySchema = Joi.object({
  strategy: Joi.object({
      name: Joi.string().required(),
      map: Joi.string().required(),
      description: Joi.string().required()
  }).required()
});