const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');
console.log(contactsPath);

const data = fs.readFile(contactsPath, 'utf8');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log('listContacts:\n', JSON.parse(data));
        // return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        // console.log(JSON.parse(data));
        console.log('getContactById:\n', JSON.parse(data).filter(contact => contact.id == contactId)[0]);
        // return JSON.parse(data).filter(contact => contact.id == contactId)[0];
    }
    catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        // console.log(JSON.parse(data));
        await fs.writeFile(contactsPath, JSON.stringify(JSON.parse(data).filter(contact => contact.id != contactId), null, 2), 'utf8');
        const newData = await fs.readFile(contactsPath, 'utf8');
        console.log('newData', JSON.parse(newData));
        // return JSON.parse(data).filter(contact => contact.id == contactId)[0];
    }
    catch (error) {
        console.error(error);
    }
    // fs.writeFile(contactsPath, JSON.stringify(listContacts().filter(contact => contact.id != contactId)), 'utf8');
    // return JSON.parse(fs.readFile(contactsPath, 'utf8'));
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        // console.log(JSON.parse(data));

        const id = String(JSON.parse(data).length + 1);
        // console.log(id);

        const newContacts = [...JSON.parse(data), { id, name, email, phone }];
        // console.log(newContacts);

        // const newData = await fs.readFile(contactsPath, 'utf8');
        // console.log('newData', JSON.parse(newData));

        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), 'utf8');

        const newData = await fs.readFile(contactsPath, 'utf8');
        console.log('newData', JSON.parse(newData));
        // return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = { listContacts, getContactById, removeContact, addContact }