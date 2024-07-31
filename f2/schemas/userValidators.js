import Joi from 'joi';

import { emailRegex, passwordRegex } from '../constant/regex.js';

export const createUserDataValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12).required().messages({
                'string.base': `'name' should be a type of 'text'`,
                'string.min': `'name' should be at lest 3 symbols`,
                'string.max': `'name' should be less then 12 symbols`,
                'string.empty': `'name' cannot be an empty field`,
                'any.required': `missing required 'name' field`,
            }),
            year: Joi.number()
                .min(1920)
                .max(new Date().getFullYear())
                .messages({
                    'number.min': `min 'year' '1920'`,
                    'number.max': `max 'year' ${new Date().getFullYear()}`,
                }),
            email: Joi.string().regex(emailRegex).required().messages({
                'string.base': `'email' should be a type of 'text'`,
                'string.empty': `'email' cannot be an empty field`,
                'string.pattern.base': `'email' has incorect pattern 'aa@a.aa'.`,
                'any.required': `missing required 'email' field`,
            }),
            password: Joi.string().regex(passwordRegex).required().messages({
                'string.base': `'password' should be a type of 'text'`,
                'string.empty': `'password' cannot be an empty field`,
                'string.pattern.base': `Password must contain at least: one digit, one lowercase English letter (a-z). Has minimum 8 characters in length.`,
                'any.required': `missing required 'password' field`,
            }),
            role: Joi.string().valid('user', 'admin', 'moderator').messages({
                'string.base': `'role' should be a type of 'text'`,
                'string.empty': `'role' cannot be an empty field`,
            }),
        })
        .validate(data);

export const singupUserValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12).required().messages({
                'string.base': `'name' should be a type of 'text'`,
                'string.min': `'name' should be at lest 3 symbols`,
                'string.max': `'name' should be less then 12 symbols`,
                'string.empty': `'name' cannot be an empty field`,
                'any.required': `missing required 'name' field`,
            }),
            year: Joi.number()
                .min(1920)
                .max(new Date().getFullYear())
                .messages({
                    'number.min': `min 'year' '1920'`,
                    'number.max': `max 'year' ${new Date().getFullYear()}`,
                }),
            email: Joi.string().regex(emailRegex).required().messages({
                'string.base': `'email' should be a type of 'text'`,
                'string.pattern.base': `'email' has incorect pattern 'aa@a.aa'.`,
                'string.empty': `'email' cannot be an empty field`,
                'any.required': `missing required 'email' field`,
            }),
            password: Joi.string().regex(passwordRegex).required().messages({
                'string.base': `'password' should be a type of 'text'`,
                'string.empty': `'password' cannot be an empty field`,
                'string.pattern.base': `Password must contain at least: one digit, one lowercase English letter (a-z). Has minimum 8 characters in length.`,
                'any.required': `missing required 'password' field`,
            }),
        })
        .validate(data);

export const loginUserValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            email: Joi.string().regex(emailRegex).required().messages({
                'string.base': `email should be a type of 'text'`,
                'string.pattern.base': `'email' has incorect pattern 'aa@a.aa'.`,
                'string.empty': `email cannot be an empty field`,
                'any.required': `missing required email field`,
            }),
            password: Joi.string().regex(passwordRegex).required().messages({
                'string.base': `'password' should be a type of 'text'`,
                'string.empty': `'password' cannot be an empty field`,
                'string.pattern.base': `Password must contain at least: one digit, one lowercase English letter (a-z). Has minimum 8 characters in length.`,
                'any.required': `missing required 'password' field`,
            }),
        })
        .validate(data);

export const updateUserDataValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12).messages({
                'string.base': `'name' should be a type of 'text'`,
                'string.min': `'name' should be at lest 3 symbols`,
                'string.max': `'name' should be less then 12 symbols`,
                'string.empty': `'name' cannot be an empty field`,
                'any.required': `missing required 'name' field`,
            }),
            year: Joi.number()
                .min(1920)
                .max(new Date().getFullYear())
                .messages({
                    'number.min': `min 'year' '1920'`,
                    'number.max': `max 'year' ${new Date().getFullYear()}`,
                }),
            email: Joi.string().regex(emailRegex).messages({
                'string.base': `'email' should be a type of 'text'`,
                'string.pattern.base': `'email' has incorect pattern 'aa@a.aa'.`,
                'string.empty': `'email' cannot be an empty field`,
                'any.required': `missing required 'email' field`,
            }),
            role: Joi.string().valid('user', 'admin', 'moderator').messages({
                'string.base': `'role' should be a type of 'text'`,
                'string.empty': `'role' cannot be an empty field`,
            }),
        })
        .validate(data);

export const updateMyDataValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().min(3).max(12).messages({
                'string.base': `'name' should be a type of 'text'`,
                'string.min': `'name' should be at lest 3 symbols`,
                'string.max': `'name' should be less then 12 symbols`,
                'string.empty': `'name' cannot be an empty field`,
            }),
            year: Joi.number()
                .min(1920)
                .max(new Date().getFullYear())
                .messages({
                    'number.min': `min 'year' '1920'`,
                    'number.max': `max 'year' ${new Date().getFullYear()}`,
                }),
            email: Joi.string().regex(emailRegex).messages({
                'string.base': `'email' should be a type of 'text'`,
                'string.pattern.base': `'email' has incorect pattern 'aa@a.aa'.`,
                'string.empty': `'email' cannot be an empty field`,
            }),
            avatarUrl: Joi.string(),
        })
        .validate(data);

export const updateMyPasswordValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            currentPassword: Joi.string().regex(passwordRegex).required().messages({
                'string.base': `'password' should be a type of 'text'`,
                'string.empty': `'password' cannot be an empty field`,
                'string.pattern.base': `Password must contain at least: one digit, one lowercase English letter (a-z). Has minimum 8 characters in length.`,
                'any.required': `missing required 'password' field`,
            }),
            newPassword: Joi.string().regex(passwordRegex).required().messages({
                'string.base': `'newPassword' should be a type of 'text'`,
                'string.empty': `'newPassword' cannot be an empty field`,
                'string.pattern.base': `newPassword must contain at least: one digit, one lowercase English letter (a-z). Has minimum 8 characters in length.`,
                'any.required': `missing required 'newPassword' field`,
            }),
            checkNewPassword: Joi.string().regex(passwordRegex).required().messages({
                'string.base': `'checkNewPassword' should be a type of 'text'`,
                'string.empty': `'checkNewPassword' cannot be an empty field`,
                'string.pattern.base': `checkNewPassword must contain at least: one digit, one lowercase English letter (a-z). Has minimum 8 characters in length.`,
                'any.required': `missing required 'checkNewPassword' field`,
            }),
        })
        .validate(data);

export const forgotPasswordValidator = (data) =>
    Joi.object()
        .options({ abortEarly: false })
        .keys({
            email: Joi.string().regex(emailRegex).messages({
                'string.base': `'email' should be a type of 'text'`,
                'string.pattern.base': `'email' has incorect pattern 'aa@a.aa'.`,
                'string.empty': `'email' cannot be an empty field`,
            }),
        })
        .validate(data);
