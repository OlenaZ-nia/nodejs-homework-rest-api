const contactRepository = require('../../repository/contacts');
const { HttpCode } = require('../../libs/constans');

const updateContact = async (req, res, next) => {
  const contact = await contactRepository.update(req.params.contactId, req.body);
  if (contact) {
    return res.json({ status: 'success', code: HttpCode.OK, message: 'contact updated', data: { contact } })
  }
  return res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

module.exports = updateContact;