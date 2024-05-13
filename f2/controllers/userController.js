import bcrypt from 'bcrypt';

import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';
import { createUser, getAllUsers, getOneUser, updateUser } from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

const userController = {
    getUsers: catchAsync(async (_, res) => {
        const users = await getAllUsers();
        res.status(200).json({
            msg: 'Succsess',
            users,
        });
    }),
    createUser: catchAsync(async (req, res) => {
        const newUser = createUser(req.body);
        newUser.password = undefined;
        res.status(201).json({
            msg: 'Succsess',
            user: newUser,
        });
    }),
    getUsersById: catchAsync(async (req, res) => {
        const { id } = req.params;
        const user = await getOneUser(id);
        res.status(200).json({
            msg: 'Succses',
            user,
        });
    }),
    updateUser: catchAsync(async (req, res) => {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json({
            msg: 'Succsess',
            user: updatedUser,
        });
    }),
    // updateUserAvatar: catchAsync(async (req, res) => {}),
};

export default userController;
