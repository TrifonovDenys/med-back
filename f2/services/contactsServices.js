import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'db', 'contacts.json');

export const listContacts = async () => {
    const res = JSON.parse(await fs.readFile(contactsPath));
    return res;
};

export const getContactById = async (id) => {
    const list = await listContacts();
    const contact = list.find((obj) => obj.id === id);
    return contact || null;
};

export const removeContact = async (id) => {
    const list = await listContacts();
    const index = list.findIndex((obj) => obj.id === id);
    if (index === -1) {
        return null;
    }
    const newList = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newList[0];
};

export const addConntact = async (data) => {
    const list = await listContacts();
    const contact = { id: uuidv4(), ...data };
    list.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return contact;
};

export const patchContact = async (id, data) => {
    const list = await listContacts();
    const index = list.findIndex((obj) => id === obj.id);
    list[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return list[index];
};

export const patchStatusContact = async (id, data) => {
    const list = await listContacts();
    const index = list.findIndex((obj) => id === obj.id);
    list[index] = { ...list[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return list[index];
};
