import Email from '../../services/emailService.js';
import jwtService from '../../services/jwtService.js';
import { checkUserExistById, getUserByEmail, loginUser, resetPassword, signupUser, verifyUser } from '../../services/userServices.js';
import catchAsync from '../../utils/catchAsync.js';

const MAX_REFRESH_TOKEN_AGE = 30 * 24 * 60 * 60 * 1000;

const authController = {
    signup: catchAsync(async (req, res) => {
        const user = await signupUser(req.body);
        const { accessToken, refreshToken } = await jwtService.generateAccessAndRefreshTokens(user.id);

        // try {
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${user.verificationToken}`;
        await new Email(user, verificationUrl).sendHello();
        // } catch (err) {
        //     console.log(err);
        // }

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
    verifyEmail: catchAsync(async (req, res) => {
        await verifyUser(req.params.verificationToken);
        res.json({
            msg: 'Verification successful',
        });
    }),
    login: catchAsync(async (req, res) => {
        const user = await loginUser(req.body);
        const { accessToken, refreshToken } = await jwtService.generateAccessAndRefreshTokens(user.id);

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
        const userId = jwtService.checkToken(cookieRefreshToken);
        const user = await checkUserExistById(userId);
        const { accessToken, refreshToken } = await jwtService.generateAccessAndRefreshTokens(user._id);

        res.cookie('refreshtoken', refreshToken, {
            maxAge: MAX_REFRESH_TOKEN_AGE,
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({ accessToken, message: 'Access token refreshed' });
    }),
    forgotPassword: catchAsync(async (req, res) => {
        const user = await getUserByEmail(req.body.email);
        if (!user) {
            return res.status(200).json({
                msg: 'Password reset instruction sent via email',
            });
        }
        const otp = await user.createPasswordResetToken();
        await user.save();

        try {
            // temp back url
            const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/restore-password/${otp}`;

            await new Email(user, resetUrl).sendRestorePassword();
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;

            await user.save();
        }
        // send otp
        res.status(200).json({
            msg: 'Password reset instruction sent via email',
        });
    }),
    restorePassword: catchAsync(async (req, res) => {
        await resetPassword(req.params.otp, req.body.password);
        res.status(200).json({
            msg: 'Success',
        });
    }),
};
export default authController;
