import express from 'express';
import fs from 'fs';
import multer from 'multer';

import userController from '../controllers/user/userController.js';
import { allowFor, protect } from '../middlewares/authMiddleware.js';
import {
    checkCreateUserData,
    checkMyPassword,
    checkUpdateMyData,
    checkUpdateUserData,
    uploadUserAvatar,
} from '../middlewares/userMiddleware.js';

const userRouter = express.Router();

// Analogy to CheckAuth
userRouter.use(protect);

userRouter.get('/get-me', userController.getMe);
userRouter.patch('/update-me', uploadUserAvatar, checkUpdateMyData, userController.updateMe);
userRouter.patch('/avatar/:id', uploadUserAvatar, userController.updateUserAvatar);
userRouter.patch('/update-my-password', checkMyPassword, userController.updateMyPassword);
userRouter.post('/verify', userController.resendVerifyEmail);

userRouter.use(allowFor('admin', 'moderator'));
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', checkCreateUserData, userController.createUser);
userRouter.patch('/:id', checkUpdateUserData, userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
