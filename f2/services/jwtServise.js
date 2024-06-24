import jwt from 'jsonwebtoken';

import HttpError from '../helpers/HttpError.js';

/**
 *
 * @param {string} payload
 * @returns {string} * jwt
 */

const signToken = (payload) =>
    jwt.sign({ payload }, process.env.jwtSecretAccessKey, {
        expiresIn: '1d',
    });

export default signToken;

export const checkToken = (token) => {
    if (!token) throw HttpError(401, 'Not logged in1 ..');
    try {
        const { payload } = jwt.verify(token, process.env.jwtSecretAccessKey);
        return payload;
    } catch (err) {
        throw HttpError(401, 'Not logged in ..');
    }
};
