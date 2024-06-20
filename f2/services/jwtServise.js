import jwt from 'jsonwebtoken';

/**
 *
 * @param {string} payload
 * @returns {string} * jwt
 */
export const signToken = (payload) =>
    jwt.sign({ payload }, process.env.jwtSecretAccessKey, {
        expiresIn: '1d',
    });
