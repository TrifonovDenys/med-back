import User from '../models/userModel.js';
import {
    addConntact,
    getContactById,
    listContacts,
    patchContact,
    patchStatusContact,
    removeContact,
} from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
    const contacts = await User.find();
    res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
    // const constact = await getContactById(req.params.id);
    const contact = await User.find({ _id: req.params.id });
    res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
    const constact = await removeContact(req.params.id);
    res.status(200).json(constact);
};

export const createContact = async (req, res) => {
    const newUSer = await User.create(req.body);
    // const contact = await addConntact(req.body);
    res.status(201).json(newUSer);
};

export const updateContact = async (req, res) => {
    console.log(Object.keys(req.body).length);
    const contact = await patchContact(req.params.id, req.body);
    res.status(200).json(contact);
};
export const updateStatusContact = async (req, res) => {
    const contact = await patchStatusContact(req.params.id, req.body);
    res.status(200).json(contact);
};
