const express = require('express');

const { contacts } = require('../../controllers');
const guard = require('../../middlewares/guard');
const { contactJoiSchema, schemaMongoId, schemaUpdateStatus, schemaQuery } = require('../../models/contactJoiSchema');
const { validateBody, validateParams, validateQuery } = require('../../middlewares/validation');
const {ctrlWrapper} = require('../../middlewares/handlerError');

const router = express.Router();

router.get('/', guard, validateQuery(schemaQuery), ctrlWrapper(contacts.listContacts))

router.get('/:contactId', guard, validateParams(schemaMongoId), ctrlWrapper(contacts.getContactById))

router.post('/', guard, validateBody(contactJoiSchema), ctrlWrapper(contacts.addContact))

router.delete('/:contactId', guard, validateParams(schemaMongoId), ctrlWrapper(contacts.removeContact))

router.put('/:contactId', guard, [validateParams(schemaMongoId), validateBody(contactJoiSchema)], ctrlWrapper(contacts.updateContact))

router.patch('/:contactId/favorite', guard, [validateParams(schemaMongoId), validateBody(schemaUpdateStatus)], ctrlWrapper(contacts.updateContact))

module.exports = router
