const contactRepository = require('../../repository/contacts');
const { HttpCode } = require('../../libs/constans');

const getContactById = async (req, res, next) => {
  const contact = await contactRepository.getById(req.params.contactId);
  
  if (contact) {
    return res.json({ status: 'success', code: HttpCode.OK, data: { contact } })
  }
  return res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

module.exports = getContactById;