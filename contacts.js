const fs = require("fs").promises;

const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath).then((data) => {
    const personContacts = JSON.parse(data);
    console.log(personContacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath).then((data) => {
    const personContacts = JSON.parse(data);
    const contactMatch = personContacts.find(
      (contact) => contact.id === contactId
    );
    if (contactMatch) {
      console.log(contactMatch);
    } else {
      console.log("who is that");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath).then((data) => {
    const personContacts = JSON.parse(data);
    const newContacts = personContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts)).then(() => {
      console.log(newContacts);
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  fs.readFile(contactsPath).then((data) => {
    const personContacts = JSON.parse(data);
    personContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(personContacts)).then(() => {
      console.log(personContacts);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
