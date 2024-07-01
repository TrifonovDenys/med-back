import HttpError from '../helpers/HttpError.js';
import { loginUserValidator, singupUserValidator, updateUserDataValidator } from '../schemas/userValidators.js';
import { checkToken } from '../services/jwtServise.js';
import { checkUserExist, getOneUser } from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

export const checkSignupUserData = catchAsync(async (req, res, next) => {
    const { error, value } = singupUserValidator(req.body);
    if (error) {
        throw HttpError(400, `${error.details[0].message}`);
    }
    await checkUserExist({ email: value.email });
    req.body = value;

    next();
});

export const checkLoginUserData = catchAsync(async (req, res, next) => {
    const { error, value } = loginUserValidator(req.body);
    if (error) {
        console.log(error.details);
        throw HttpError(400, `${error.details[0].message}`);
    }
    req.body = value;

    next();
});

export const protect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

    const userId = checkToken(token);
    const currentUser = await getOneUser(userId);

    if (!currentUser) throw HttpError(401, 'Not logged in ..');

    req.user = currentUser;

    next();
});

export const allowFor =
    (...roles) =>
    (req, res, next) => {
        if (roles.includes(req.user.role)) return next();

        next(HttpError(403, 'You are not allowed to perform this action..'));
    };
