const contactRepository = require('../../repository/contacts');
const { HttpCode } = require('../../libs/constans');

const listContacts = async (req, res, next) => {
  const contacts = await contactRepository.getAll();
  res.json({ status: 'success', code: HttpCode.OK, data: { contacts } });
}

module.exports = listContacts; 
