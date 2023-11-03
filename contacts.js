import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve("db", "contacts.json");

export const getAllContacts = async () => {
    const data = await readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

export const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
}

export const removeContact = async (contactId) => {
    const contacts = await getAllContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
}

export const addContact = async ({ name, email, phone }) => {
  const contacts = await getAllContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2)); 
    return newContact;
    }
