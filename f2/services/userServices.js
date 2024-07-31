import { Types } from 'mongoose';

import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import ImageService from './imgService.js';

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
export const updateUser = catchAsync(async (id, userData) => {
    const user = await User.findById(id);
    Object.keys(userData).forEach((key) => {
        user[key] = userData[key];
    });
    const updatedUser = await user.save();
    return updatedUser;
});

/** Update logged in user data service
 * @param { string } id
 * @param { Object } userData
 * @returns {Promise<User>}
 * @category services
 */
export const updateMe = async (userData, user, file) => {
    // console.log(file);
    if (file) {
        user.avatarUrl = await ImageService.save(file, {}, 'images', 'users', user.id);
    }
    Object.keys(userData).forEach((key) => {
        user[key] = userData[key];
    });
    // console.log(user);
    const updatedUser = await user.save();
    return updatedUser;
};

/** Update user avatar service
 * @param { string } id
 * @param { Object } userData
 * @returns {Promise<User>}
 * @category services
 */

export const updateUserAvatar = async (id, avatar) => {
    const user = await User.findOneAndUpdate({ _id: id }, { avatar });
    user.avatarUrl = avatarUrl;
    return user;
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
    const userExist = await User.findById(id);
    if (!userExist) {
        throw HttpError(404, 'User not found');
    }
    return userExist;
};

export const checkUserExistByEmail = async (userEmail) => {
    const user = await User.findOne({ email: userEmail });
};

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

    return newUser;
};

export const loginUser = async (userData) => {
    // поиск одного пользователя по email + достать 1 поле
    const user = await User.findOne({ email: userData.email }).select('+password');

    if (!user) throw HttpError(401, 'Not registrated');
    // throw HttpError(401, 'Not autorized');

    const passwordIsValid = await user.checkPassword(userData.password, user.password);

    if (!passwordIsValid) throw HttpError(401, 'Wrong password');
    // throw HttpError(401, 'Not autorized');

    user.password = undefined;

    return user;
};

export const checkUserPassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select('+password');
    if (!(await user.checkPassword(currentPassword, user.password))) throw HttpError(401, `Current password is wrong`);

    user.password = newPassword;
    await user.save();
};

export const forgotPassword = async (userEmail) => {};
