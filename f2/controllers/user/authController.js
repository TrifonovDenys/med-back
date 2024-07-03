import { generateAccessAndRefreshTokens, signAccsessToken, signRefreshToken } from '../../services/jwtServise.js';
import { loginUser, signupUser } from '../../services/userServices.js';
import catchAsync from '../../utils/catchAsync.js';

const MAX_REFRESH_TOKEN_AGE = 30 * 24 * 60 * 60 * 1000;

const authController = {
    signup: catchAsync(async (req, res) => {
        const user = await signupUser(req.body);
        console.log(user);
        const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user.id);

        res.status(201)
            .cookie('refreshtoken', refreshToken, {
                maxAge: MAX_REFRESH_TOKEN_AGE,
                httpOnly: true,
                secure: true,
            })
            .json({
                user: {
                    email: user.email,
                    role: user.role,
                },
                accessToken,
            });
    }),
    login: catchAsync(async (req, res) => {
        const user = await loginUser(req.body);
        console.log(user);
        const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user.id);
        console.log(accessToken, refreshToken);

        res.status(200)
            .cookie('refreshtoken', refreshToken, {
                maxAge: MAX_REFRESH_TOKEN_AGE,
                httpOnly: true,
                secure: true,
            })
            .json({
                user,
                accessToken,
            });
    }),
    logout: catchAsync(async (req, res) => {}),
};
export default authController;
