import HttpError from '../helpers/HttpError.js';
import Contact from '../models/contactModel.js';

export const getAllContact = async (req, res) => {
    try {
    } catch (err) {}
    const contacts = await Contact.find();
    res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        throw HttpError(404);
    }
    res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete(id);
    if (!contact) {
        throw HttpError(404);
    }
    res.status(204);
};

export const createContact = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const contact = await Contact.findByIDAndUpdate(id, {
        name,
        email,
        phone,
    });
    if (!contact) {
        throw HttpError(404);
    }
    res.status(200).json(contact);
};
export const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findOneAndUpdate({ _id: id }, { favorite });
    if (!contact) {
        throw HttpError(404);
    }
    res.status(200).json(contact);
};
