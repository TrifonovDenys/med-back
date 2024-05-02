import {listContacts, getContactById, removeContact, addConntact, patchContact} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
};

export const getOneContact = async (req, res) => {
  const constact = await getOneContact()
  res.status(200).json(constact)
};

export const deleteContact = (req, res) => { };

export const createContact = (req, res) => { };

export const updateContact = (req, res) => { };
