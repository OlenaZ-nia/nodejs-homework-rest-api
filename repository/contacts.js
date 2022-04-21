const Contact = require('../models/contact');

const getAll = async ({limit, page, sort}, filter, user) => {
    let option = {};
    if (filter) {
        option = { owner: user.id, favorite: filter };
    }
    if (!filter) {
        option = { owner: user.id };
    }

    const { docs: contacts, ...rest } = await Contact.paginate(
        option,
        {limit, page, sort, select: 'name email phone favorite'},
    )
    return { contacts, ...rest }
}

const getById = async (contactId, user) => {
    const result = await Contact.findOne({ _id: contactId, owner: user.id }).populate({
        path: 'owner',
        select: 'email subscription',
    }); 
    return result
}

const remove = async (contactId, user) => {
    const result = await Contact.findOneAndRemove({_id: contactId, owner: user.id}); 
    return result
}

const create = async (body, user) => {
    const result = await Contact.create({ ...body, owner: user.id }); 
    return result
}

const update = async (contactId, body, user) => {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner: user.id },
      { ...body },
      { new: true },
    );
    return result
}

const checkContact = async (body, user) => {
    const result = await Contact.findOne({
        $or: [
            { name: body.name },
            { email: body.email },
            { phone: body.phone }
        ], owner: user.id
    }); 
    return result
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update,
    checkContact
}