import HttpError from '../helpers/HttpError.js';
import { singupUserValidator, updateUserDataValidator } from '../schemas/userValidators.js';
import { checkUserExist } from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

export const checkSignupUserData = catchAsync(async (req, res, next) => {
    const { error, value } = singupUserValidator(req.body);

    if (error) {
        console.log(error);
        throw HttpError(400, 'Invalid user data..');
    }
    await checkUserExist({ email: value.email });
    req.body = value;

    next();
});

export const checkUpdateUserData = catchAsync(async (req, res, next) => {
    const { error, value } = updateUserDataValidator(req.body);

    if (error) {
        console.log(error);
        throw HttpError(400, 'Invalid user data..');
    }
    await checkUserExist({ email: value.email, _id: { $ne: req.paramsid } });
    req.body = value;

    next();
});
