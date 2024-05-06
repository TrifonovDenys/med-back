import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';

export const getAllContacts = async (req, res) => {
    const contacts = await User.find();
    res.status(200).json(contacts);
};

export const getOneUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw HttpError(404);
    }
    res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndRemove(id);
    if (!user) {
        throw HttpError(404);
    }
    res.status(200).json(user);
};

export const createContact = async (req, res) => {
    const newUSer = await User.create(req.body);
    res.status(201).json(newUSer);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(id, req.body);
    if (!user) {
        throw HttpError(404);
    }
    res.status(200).json(user);
};
export const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(id, req.body);
    if (!user) {
        throw HttpError(404);
    }
    res.status(200).json(user);
};
