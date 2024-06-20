import { loginUser, signupUser } from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

export const signup = catchAsync(async (req, res) => {
    const { user, token } = await signupUser(req.body);

    res.status(201).json({
        msg: 'Success',
        user,
        token,
    });
});

export const login = catchAsync(async (req, res) => {
    const { user, token } = await loginUser(req.body);

    res.status(200).json({
        user,
        token,
    });
});
