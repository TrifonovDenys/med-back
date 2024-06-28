import { loginUser, signupUser } from '../services/userServices.js';
import catchAsync from '../utils/catchAsync.js';

const authController = {
    signup: catchAsync(async (req, res) => {
        const { user, token } = await signupUser(req.body);

        res.status(201).json({
            user: {
                email: user.email,
                role: user.role,
            },
            token,
        });
    }),
    login: catchAsync(async (req, res) => {
        const { user, token } = await loginUser(req.body);

        res.status(200).json({
            user,
            token,
        });
    }),
};
export default authController;
