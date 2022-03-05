const { randomUUID } = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '..','db','contacts.json');

const readContent = async () => {
  const content = await fs.readFile(contactsPath, 'utf-8');
  const result = JSON.parse(content);
  return result;
}

const writeContent = async (arr) => {
  const content = await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));
  return content;
}

const listContacts = async () => {
  try {
    return await readContent();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const getContactById = async (contactId) => {
  try {
        const contacts = await readContent();
        const contact = contacts.find(item => item.id === contactId);
        return contact;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await readContent();
    const deletedContact = contacts.find(item => item.id === contactId);
    if (!deletedContact) {
      console.log('Contact Not Found');
      return null;
    }
    const updatedContacts = contacts.filter(item => item.id !== contactId);
    await writeContent(updatedContacts);
    return deletedContact;
      
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await readContent();
    const newContact = { id: randomUUID(), ...body };
    
    const includeName = contacts.find(item => item.name === body.name);
    if (includeName !== undefined) {
      console.log(`${body.name} is already in contacts`);
      return null;
    }
    
    contacts.push(newContact);
    await writeContent(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
    process.exit(1);
    }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContent();
    const index = contacts.findIndex(contact => contact.id === contactId);
    
    if (index === -1) {
      return null;
    }
    
    contacts[index] = { ...contacts[index], ...body };
    await writeContent(contacts);
    return contacts[index];
      
  } catch (error) {
    console.log(error);
    process.exit(1);
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  readContent,
  writeContent
}
