import jwt from 'jsonwebtoken';

import HttpError from '../helpers/HttpError.js';

/**
 * @param {string} id (payload)
 * @returns {string} * jwt
 */

const signAccsessToken = (payload) =>
    jwt.sign({ payload }, process.env.jwtSecretAccessKey, {
        expiresIn: process.env.AuthAccessTokenExpiry,
    });

const signRefreshToken = (payload) =>
    jwt.sign({ payload }, process.env.jwtSecretAccessKey, {
        expiresIn: process.env.AuthRefreshTokenExpiry,
    });

const jwtServise = {
    generateAccessAndRefreshTokens: async (userId) => {
        const accessToken = signAccsessToken(userId);
        const refreshToken = signRefreshToken(userId);
        return { accessToken, refreshToken };
    },
    checkToken: (token) => {
        if (!token) throw HttpError(401, 'token not found');
        try {
            const { payload } = jwt.verify(token, process.env.jwtSecretAccessKey);
            return payload;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                console.error('JWT Error: Token expired');
                throw HttpError(401, 'Token expired');
            } else {
                console.error('JWT Error:', error.message);
                throw HttpError(401, 'Invalid token');
            }
        }
    },
};

export default jwtServise;
