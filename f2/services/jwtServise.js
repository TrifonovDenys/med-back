import jwt from 'jsonwebtoken';

import HttpError from '../helpers/HttpError.js';

/**
 * @param {string} payload-(_id)
 * @returns {string} * jwt
 */

export const signAccsessToken = (payload) =>
    jwt.sign({ payload }, process.env.jwtSecretAccessKey, {
        expiresIn: process.env.AuthAccessTokenExpiry,
    });

export const signRefreshToken = (payload) =>
    jwt.sign({ payload }, process.env.jwtSecretAccessKey, {
        expiresIn: process.env.AuthRefreshTokenExpiry,
    });

export const generateAccessAndRefreshTokens = async (userId) => {
    console.log(userId);
    try {
        const accessToken = signAccsessToken(userId);
        const refreshToken = signRefreshToken(userId);

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkToken = (token) => {
    if (!token) throw HttpError(401, 'Not logged in1 ..');
    try {
        const { payload } = jwt.verify(token, process.env.jwtSecretAccessKey);
        return payload;
    } catch (error) {
        throw HttpError(401, 'Not logged in ..');
    }
};
