const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'db/contacts.json');

// Returns an array of contacts.
const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(data);
};
  
// Returns the contact object with this id. Returns null if no contact with this id is found.
  const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
  
    return result || null;
  }
  
  // Returns the deleted contact object. Returns null if no contact with this id is found.
  const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
    return result;
  }

  // Returns the object of the added contact.
  const addContact = async (contact) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
    return newContact;
  };

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }