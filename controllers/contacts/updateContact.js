const contactsService = require('../../services/contacts');
const { HttpCode } = require('../../libs');

const updateContact = async (req, res, next) => {
  const contact = await contactsService.update(req.params.contactId, req.body, req.user);
  return res.json({ status: 'success', code: HttpCode.OK, message: 'contact updated', data: { contact } })
}

module.exports = updateContact;