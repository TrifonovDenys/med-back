import express from 'express';

import userController from '../controllers/user/userController.js';
import { allowFor, protect } from '../middlewares/authMiddleware.js';
import { checkCreateUserData, checkUpdateUserData } from '../middlewares/userMiddleware.js';

const userRouter = express.Router();

// Analogy to CheckAuth
userRouter.use(protect);

userRouter.get('/get-me', userController.getMe);
// userRouter.patch('/update-me', );
// Router.patch('/update-my-password', )

userRouter.use(allowFor('admin', 'moderator'));
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', checkCreateUserData, userController.createUser);
userRouter.patch('/:id', checkUpdateUserData, userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
