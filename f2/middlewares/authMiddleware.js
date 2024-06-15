import HttpError from "../helpers/HttpError";
import { singupUserValidator, updateUserDataValidator } from "../schemas/userValidators"
import catchAsync from "../utils/catchAsync";

export const checkSignupUserData = catchAsync(async (req, res, next) => {
    const { error, value } = singupUserValidator(req.body)
    
    if (error) {
        console.log(error);
        throw new HttpError(400, 'Invalid user data..')
    }

    req.body = value

    next()
})

export const checkUpdateUserData = catchAsync(async (req, res, next) => {
    const { error, value } = updateUserDataValidator(req.body)
    
    if (error) {
        console.log(error);
        throw new HttpError(400, 'Invalid user data..')
    }

    req.body = value

    next()
})