const Contacts = require('../../repository/contacts');
const { HttpCode } = require('../../libs');
const { HttpError } = require('../../middlewares/handlerError');

class ContactsService {
  async getAll(query, user) {
    const { limit = 20, page = 1, favorite: filter } = query;

    const result = await Contacts.getAll(
      { limit, page },
      filter,
      user,
    )

    return result
  }

  async getById(id, user) {
    const contact = await Contacts.getById(id, user)
    if (!contact) {
      throw new HttpError(HttpCode.NOT_FOUND, 'Not Found')
    }
    return contact
  }

  async create(body, user) {
    const checkContact = await Contacts.checkContact(body, user)
    if (!checkContact) {
      const contact = await Contacts.create(body, user)
      return contact
    }
    const { name, email, phone } = checkContact
    if (name === body.name) {
      throw new HttpError(HttpCode.BAD_REQUEST, `Contact ${name} is already in contacts`)
    }
    if (email === body.email) {
      throw new HttpError(HttpCode.BAD_REQUEST, `Contact ${email} is already in contacts`)
    }
    if (phone === body.phone) {
      throw new HttpError(HttpCode.BAD_REQUEST, `Contact ${phone} is already in contacts`)
    }
  }

  async update(id, body, user) {
    const contact = await Contacts.update(id, body, user)
    if (!contact) {
      throw new HttpError(HttpCode.NOT_FOUND, 'Not Found')
    }
    return contact
  }

  async remove(id, user) {
    const contact = await Contacts.remove(id, user)
    if (!contact) {
      throw new HttpError(HttpCode.NOT_FOUND, 'Not Found')
    }
    return contact
  }
}

module.exports = new ContactsService()