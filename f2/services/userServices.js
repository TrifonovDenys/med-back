import { Types } from 'mongoose';

import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';
import signToken from './jwtServise.js';

/** Create user sservice
 * @param { Object } userData
 * @returns {Promise<User>}
 * @category services
 */
export const createUser = async (userData) => {
    const newUser = await User.create(userData);
    newUser.password = undefined;
    return newUser;
};

/** Get All users service
 * @returns {Promise<User[]>}
 * @category services
 */
export const getAllUsers = () => User.find();

/** Get one user service
 * @param { string } id
 * @returns {Promise<User>}
 * @category services
 */
export const getOneUser = (id) => User.findById(id);

/** Update user data service
 * @param { string } id
 * @param { Object } userData
 * @returns {Promise<User>}
 * @category services
 */
export const updateUser = async (id, userData) => {
    const user = await User.findById(id);
    Object.keys(userData).forEach((key) => {
        user[key] = userData[key];
    });
    const updatedUser = await user.save();
    return updatedUser;
};

/** Get one user service
 * @param { string } id
 * @returns {Promise<User>}
 * @category services
 */
export const deleteUser = (id) => User.findbyIdAndDelete(id);

export const checkUserExistById = async (id) => {
    const idIsValid = Types.ObjectId.isValid(id);
    if (!idIsValid) {
        throw HttpError(400, 'Invalid user ID format'); // 400 for bad request
    }
    const userExist = await User.find({ _id: id });
    if (!userExist) {
        throw HttpError(404, 'User not found');
    }
    return userExist;
};

export const checkUserExistByEmail = (email) => {};

export const checkUserExist = async (filter) => {
    const userExists = await User.exists(filter);

    if (userExists) throw HttpError(409, 'User exists..');
};

export const signupUser = async (userData) => {
    // скидываем права нового пльзоватля до user
    const newUserData = {
        ...userData,
        role: 'user',
    };

    // создаем нового пользователя из newUserData
    const newUser = await User.create(newUserData);

    // скидываем пароль чтобы не пошел дальше в res
    newUser.password = undefined;

    //
    const token = signToken(newUser.id);
    return { user: newUser, token };
};

export const loginUser = async (userData) => {
    // поиск одного пользователя по email + достать 1 поле
    const user = await User.findOne({ email: userData.email });
    console.log(user.password);
    if (!user) throw HttpError(401, 'Not registrated');
    // throw HttpError(401, 'Not autorized');

    const passwordIsValid = await user.checkPassword(userData.password, user.password);

    if (!passwordIsValid) throw HttpError(401, 'Wrong password');
    // throw HttpError(401, 'Not autorized');

    user.password = undefined;

    const token = signToken(user.id);

    return { user, token };
};
