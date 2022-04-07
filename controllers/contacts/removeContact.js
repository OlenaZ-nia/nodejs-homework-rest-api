const contactRepository = require('../../repository/contacts');
const { HttpCode } = require('../../libs/constans');

const removeContact =  async (req, res, next) => {
  const contact = await contactRepository.remove(req.params.contactId);
  if (contact) {
    return res.json({ status: 'success', code: HttpCode.OK, message: 'contact deleted', data: { contact } })
  }
  return res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

module.exports = removeContact;