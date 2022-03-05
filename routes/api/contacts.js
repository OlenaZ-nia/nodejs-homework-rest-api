const express = require('express');
const contactModel = require('../../models/contact');

const { contactSchema } = require('../../schemas/contactSchema');
const {validateBody} = require('../../middlewares/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await contactModel.listContacts();
  res.json({ status: 'success', code: 200, data: { contacts } });
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: 'success', code: 200, data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not found' })
})

router.post('/', validateBody(contactSchema), async (req, res, next) => {
  const contact = await contactModel.addContact(req.body);
  if (contact) {
    return res
      .status(201)
      .json({ status: 'success', code: 201, message: 'contact added', data: { contact } });
  }
  return res
    .status(400)
    .json({ status: 'error', code: 400, message: 'Contact is already in contacts' })
  
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactModel.removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: 'success', code: 200, message: 'contact deleted',data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not found' })
})

router.put('/:contactId', validateBody(contactSchema), async (req, res, next) => {
  const contact = await contactModel.updateContact(req.params.contactId, req.body);
  if (contact) {
    return res.json({ status: 'success', code: 200, message: 'contact updated', data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not found' })
})

module.exports = router
