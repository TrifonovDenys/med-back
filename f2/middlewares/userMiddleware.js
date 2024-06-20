import HttpError from '../helpers/HttpError';
import { singupUserValidator } from '../schemas/userValidators';
import { checkUserExist, checkUserExistById } from '../services/userServices';
import catchAsync from '../utils/catchAsync';

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
