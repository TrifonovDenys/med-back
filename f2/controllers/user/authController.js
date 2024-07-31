import jwtServise from '../../services/jwtServise.js';
import { checkUserExistById, forgotPassword, loginUser, signupUser } from '../../services/userServices.js';
import catchAsync from '../../utils/catchAsync.js';

const MAX_REFRESH_TOKEN_AGE = 30 * 24 * 60 * 60 * 1000;

const authController = {
    signup: catchAsync(async (req, res) => {
        const user = await signupUser(req.body);
        const { accessToken, refreshToken } = await jwtServise.generateAccessAndRefreshTokens(user.id);

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
        const { accessToken, refreshToken } = await jwtServise.generateAccessAndRefreshTokens(user.id);

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
    logout: catchAsync(async (_, res) => {
        res.status(200).clearCookie('refreshtoken').json({ user: {}, message: 'Logged out successfully' });
    }),
    refreshAccsessToken: catchAsync(async (req, res) => {
        const cookieRefreshToken = req.cookies.refreshtoken;
        const userId = jwtServise.checkToken(cookieRefreshToken);
        const user = await checkUserExistById(userId);
        const { accessToken, refreshToken } = await jwtServise.generateAccessAndRefreshTokens(user._id);

        res.cookie('refreshtoken', refreshToken, {
            maxAge: MAX_REFRESH_TOKEN_AGE,
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({ accessToken, message: 'Access token refreshed' });
    }),
    forgotPassword: catchAsync(async (req, res) => {
        res.status(200).json({
            msg: 'Succsess',
        });
    }),
    restorPassword: catchAsync(async (req, res) => {}),
};
export default authController;
