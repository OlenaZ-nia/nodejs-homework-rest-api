const Joi = require('joi')

const userJoiSchema = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/, 'password').required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),
    token: Joi.string(),
})
  .messages({
  'any.required': 'missing required name field {{#label}}',
  'string.base': '{{#label}} must be a string',
  'string.empty': '{{#label}} is not allowed to be empty',     
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'any.unknown': 'A value was present while it was not expected',
  })

const schemaUpdateStatus = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
}).messages({
  'any.required': 'missing field {{#label}}',
})

module.exports = { userJoiSchema, schemaUpdateStatus }