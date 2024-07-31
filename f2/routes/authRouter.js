import express from 'express';

import authController from '../controllers/user/authController.js';
import { checkLoginUserData, checkSignupUserData, checkforgotPasswordUserData } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

// const userCredentials = {
//     email: 'admin@gmail.com',
//     email: 'moderator@gmail.com',
//     email: 'user@gmail.com',
//     password: 'user1234',
// };

authRouter.post('/signup', checkSignupUserData, authController.signup);
authRouter.post('/login', checkLoginUserData, authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refresh_token', authController.refreshAccsessToken);
authRouter.post('/forgor-password', checkforgotPasswordUserData, authController.forgotPassword);
authRouter.post('/restor-password/:otp', authController.restorPassword);

export default authRouter;
