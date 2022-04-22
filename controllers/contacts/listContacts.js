const contactsService = require('../../services/contacts');
const { HttpCode } = require('../../libs');

const listContacts = async (req, res, next) => {
  const contacts = await contactsService.getAll(req.query, req.user);
  res.json({ status: 'success', code: HttpCode.OK, data: { ...contacts } });
}

module.exports = listContacts; 
