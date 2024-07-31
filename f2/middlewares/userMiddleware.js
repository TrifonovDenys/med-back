import HttpError from '../helpers/HttpError.js';
import {
    singupUserValidator,
    updateMyDataValidator,
    updateMyPasswordValidator,
    updateUserDataValidator,
} from '../schemas/userValidators.js';
import ImageService from '../services/imgService.js';
import { checkUserExist, checkUserExistById, checkUserPassword } from '../services/userServices.js';
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

export const checkUpdateMyData = catchAsync(async (req, res, next) => {
    const { error, value } = updateMyDataValidator(req.body);

    if (error) {
        throw HttpError(400, 'Invalid user data..');
    }
    await checkUserExist({ email: value.email, _id: { $ne: req.paramsid } });
    req.body = value;

    next();
});

export const checkMyPassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword, checkNewPassword } = req.body;
    if (newPassword !== checkNewPassword) throw HttpError(400, `New passwords do not match`);
    const { error, value } = updateMyPasswordValidator(req.body);
    if (error) {
        throw HttpError(400, 'Invalid user data..');
    }

    await checkUserPassword(req.user.id, currentPassword, newPassword);

    next();
});

export const uploadUserAvatar = ImageService.initUploadMiddleware('avatarUrl');
