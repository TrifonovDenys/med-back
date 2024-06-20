import jwt from 'jsonwebtoken';

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
