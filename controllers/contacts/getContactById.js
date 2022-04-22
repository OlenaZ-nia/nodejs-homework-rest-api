const contactsService = require('../../services/contacts');
const { HttpCode } = require('../../libs');

const getContactById = async (req, res, next) => {
  const contact = await contactsService.getById(req.params.contactId, req.user);
  return res.json({ status: 'success', code: HttpCode.OK, data: { contact } })
}

module.exports = getContactById;