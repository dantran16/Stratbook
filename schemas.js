const Joi = require('joi');

module.exports.strategySchema = Joi.object({
  strategy: Joi.object({
    name: Joi.string().required(),
    map: Joi.string().required(),
    description: Joi.string().required(),
    number: Joi.number().integer().min(1).max(5).required()
  }).required()
});