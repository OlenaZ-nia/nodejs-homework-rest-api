const Contact = require('../models/contact');

const getAll = async () => {
    const result = await Contact.find();
    return result
}

const getById = async (contactId) => {
    const result = await Contact.findOne({_id: contactId}); // Contact.findById(contactId)
    return result
}

const remove = async (contactId) => {
    const result = await Contact.findOneAndRemove({_id: contactId}); 
    return result
}

const create = async (body) => {
    const result = await Contact.create(body);  
    return result
}

const update = async (contactId, body) => {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true },
    );
    return result
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update
}