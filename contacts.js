const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');
console.log(contactsPath);

const data = fs.readFile(contactsPath, 'utf8');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log('listContacts:\n', JSON.parse(data));
    }
    catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log('getContactById:\n', JSON.parse(data).filter(contact => contact.id == contactId)[0]);
    }
    catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        await fs.writeFile(contactsPath, JSON.stringify(JSON.parse(data).filter(contact => contact.id != contactId), null, 2), 'utf8');
        const newData = await fs.readFile(contactsPath, 'utf8');
        console.log('newData', JSON.parse(newData));
    }
    catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const id = String(JSON.parse(data).length + 1);
        const newContacts = [...JSON.parse(data), { id, name, email, phone }];
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), 'utf8');
        const newData = await fs.readFile(contactsPath, 'utf8');
        console.log('newData', JSON.parse(newData));
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact }