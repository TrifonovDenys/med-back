import Joi from 'joi';

import { emailRegex, passwordRegex } from '../constant/regex.js';

export const createUserDataValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12).required(),
            year: Joi.number().min(1920).max(new Date().getFullYear()),
            email: Joi.string().regex(emailRegex).required(),
            pasword: Joi.string().regex(passwordRegex).required(),
            role: Joi.string().valid('user', 'admin', 'moderator'),
        })
        .validate(data);

export const singupUserValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12).required(),
            year: Joi.number().min(1920).max(new Date().getFullYear()),
            email: Joi.string().regex(emailRegex).required(),
            password: Joi.string().regex(passwordRegex).required(),
        })
        .validate(data);

export const updateUserDataValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12),
            year: Joi.string().min(1920).max(new Date().getFullYear()),
            email: Joi.string().regex(emailRegex),
            role: Joi.string.valid('user', 'admin', 'moderator'),
        })
        .validate(data);
