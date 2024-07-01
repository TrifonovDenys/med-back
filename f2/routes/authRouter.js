import express from 'express';

import authController from '../controllers/authController.js';
import validateBody from '../helpers/validateBody.js';
import { checkLoginUserData, checkSignupUserData } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

// const userCredentials = {
//     email: 'admin@gmail.com',
//     email: 'moderator@gmail.com',
//     email: 'user@gmail.com',
//     password: 'user1234',
// };

authRouter.post('/signup', checkSignupUserData, authController.signup);
authRouter.post('/login', checkLoginUserData, authController.login);
// authRouter.post('/forgor-password')
// authRouter.post('/restor-password/<one-time-password>')

export default authRouter;
