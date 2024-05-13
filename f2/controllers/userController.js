import bcrypt from 'bcrypt';

import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';

const userController = {
    getUser: async (req, res) => {},
    createUser: async (req, res) => {
        try {
            // const { password, ...userData } = req.body;
            // const salt = await bcrypt.genSalt(10);
            // const hashedPasword = await bcrypt.hash(password, salt);
            // const isPasswordCorrect = await bcrypt.compare()
            const newUser = await User.create(req.body);
            newUser.password = undefined;
            res.status(201).json({
                msg: 'Succsess',
                user: newUser,
            });
        } catch (err) {
            throw HttpError(400);
        }
    },
    updateUser: async (req, res) => {},
    updateUserAvatar: async (req, res) => {},
};

export default userController;
