const contactsService = require('../../services/contacts');
const { HttpCode } = require('../../libs');

const removeContact =  async (req, res, next) => {
  const contact = await contactsService.remove(req.params.contactId, req.user);
  return res.json({ status: 'success', code: HttpCode.OK, message: 'contact deleted', data: { contact } })
}

module.exports = removeContact;