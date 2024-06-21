import HttpError from '../helpers/HttpError.js';
import { singupUserValidator, updateUserDataValidator } from '../schemas/userValidators.js';
import { checkUserExist, checkUserExistById } from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

export const checkUserId = catchAsync(async (req, res, next) => {
    await checkUserExistById(req.params.id);
    next();
});

export const checkCreateUserData = catchAsync(async (req, res, next) => {
    const { error, value } = singupUserValidator(req.body);

    if (error) {
        throw HttpError(400, 'Invalid user data..');
    }
    await checkUserExist({ email: value.email });
    req.body = value;

    next();
});

export const checkUpdateUserData = catchAsync(async (req, res, next) => {
    const { error, value } = updateUserDataValidator(req.body);

    if (error) {
        throw HttpError(400, 'Invalid user data..');
    }
    await checkUserExist({ email: value.email, _id: { $ne: req.paramsid } });
    req.body = value;

    next();
});
