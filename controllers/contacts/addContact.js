const contactRepository = require('../../repository/contacts');
const { HttpCode } = require('../../libs/constans');

const addContact = async (req, res, next) => {
  const contact = await contactRepository.create(req.body);
  
  if (contact) {
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, message: 'contact added', data: { contact } });
  }
  return res
    .status(HttpCode.BAD_REQUEST)
    .json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Contact is already in contacts' })
}

module.exports = addContact;