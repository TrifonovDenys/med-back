import express from 'express';

import { login, signup } from '../controllers/authController.js';
import { checkSignupUserData } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup', checkSignupUserData, signup);
authRouter.post('/login', login);

export default authRouter;
