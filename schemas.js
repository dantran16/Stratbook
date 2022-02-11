const Joi = require('joi');

module.exports.strategySchema = Joi.object({
  strategy: Joi.object({
    name: Joi.string().required(),
    map: Joi.string().required(),
    description: Joi.string().required(),
  }).required()
});

module.exports.playerSchema = Joi.object({
  player: Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string().required(),
  }).required()
})

module.exports.nadeSchema = Joi.object({
  nade: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }).required()
})