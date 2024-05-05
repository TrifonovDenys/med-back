import { addConntact, getContactById, listContacts, patchContact, removeContact } from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
    const contacts = await listContacts();
    res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
    const constact = await getContactById(req.params.id);
    res.status(200).json(constact);
};

export const deleteContact = async (req, res) => {
    const constact = await removeContact(req.params.id);
    res.status(200).json(constact);
};

export const createContact = async (req, res) => {
    const contact = await addConntact(req.body);
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    console.log(Object.keys(req.body).length);
    const contact = await patchContact(req.params.id, req.body);
    res.status(200).json(contact);
};
