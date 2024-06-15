import HttpError from '../helpers/HttpError.js';
import User from '../models/userModel.js';

/** Create user sservice
 * @param { Object } userData
 * @returns {Promise<User>}
 * @category services
 */
export const createUser = async (userData) => {
    const newUser = User.create(userData);
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

export const checkUserExistById = (id) => {
    // const idIsValid = Types.ObjectId.isValid(id);
    // if (!idIsValid) throw HttpError(404, 'User not found..');
    // const userExist = User.find({ _id: id });
    // if (!userExist) throw HttpError(404, 'User not found..');
};

export const checkUserExistByEmail = (email) => {};

export const checkUserExist = async (filter) => {
    const userExists = await User.exists(filter)

    if (userExists) throw new HttpError(409, 'User exists..')
}

export const signup = async (userData) => {

    //скидываем права нового пльзоватля до user
    const newUserData = {
        ...userData,
        role: 'user'
    }

    //создаем нового пользователя из newUserData
    const newUser = User.create(newUserData)

    //скидываем пароль чтобы не пошел дальше в res
    newUser.password = undefined

    //
    const token = signToken(newUser.id)

    return {user: newUser, token}

}