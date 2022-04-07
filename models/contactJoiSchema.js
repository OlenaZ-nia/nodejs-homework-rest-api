const Joi = require('joi')

Joi.objectId = require('joi-objectid')(Joi)

const contactJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, 'numbers').required(),
  favorite: Joi.boolean(),
})
  .messages({
  'any.required': 'missing required name field {{#label}}',
  'string.base': '{{#label}} must be a string',
  'string.empty': '{{#label}} is not allowed to be empty',     
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'any.unknown': 'A value was present while it was not expected',
  })

const schemaMongoId = Joi.object({
  contactId: Joi.objectId().required(),
})

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required()
}).messages({
  'any.required': 'missing field {{#label}}',
})

module.exports = { contactJoiSchema, schemaMongoId, schemaUpdateStatus }


