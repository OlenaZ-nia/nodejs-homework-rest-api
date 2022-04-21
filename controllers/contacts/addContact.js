const contactsService = require('../../services/contacts');
const { HttpCode } = require('../../libs');

const addContact = async (req, res, next) => {
  const contact = await contactsService.create(req.body, req.user);
  return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, message: 'contact added', data: { contact } });
}

module.exports = addContact;