import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';

export const getAllUser = async (req, res) => {
    try {
    } catch (err) {}
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
    const user = await User.findOneAndDelete(id);
    if (!user) {
        throw HttpError(404);
    }
    res.status(204);
};

export const createUser = async (req, res) => {
    const newUSer = await User.create(req.body);
    res.status(201).json(newUSer);
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const user = await User.findByIDAndUpdate(id, {
        name,
        email,
        phone,
    });
    if (!user) {
        throw HttpError(404);
    }
    res.status(200).json(user);
};
export const updateStatusUser = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;

    const user = await User.findOneAndUpdate({ _id: id }, { favorite });
    if (!user) {
        throw HttpError(404);
    }
    res.status(200).json(user);
};
