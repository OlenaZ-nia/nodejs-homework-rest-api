const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../controllers/contacts');

const { contactJoiSchema, schemaMongoId, schemaUpdateStatus } = require('../../models/contactJoiSchema');
const { validateBody, validateParams } = require('../../middlewares/validation');
const ctrlWrapper = require('../../middlewares/handlerError');

const router = express.Router();

router.get('/', ctrlWrapper(listContacts))

router.get('/:contactId', validateParams(schemaMongoId), ctrlWrapper(getContactById))

router.post('/', validateBody(contactJoiSchema), ctrlWrapper(addContact))

router.delete('/:contactId', validateParams(schemaMongoId), ctrlWrapper(removeContact))

router.put('/:contactId', [validateParams(schemaMongoId), validateBody(contactJoiSchema)], ctrlWrapper(updateContact))

router.patch('/:contactId/favorite', [validateParams(schemaMongoId), validateBody(schemaUpdateStatus)], ctrlWrapper(updateContact))

module.exports = router
