import express from 'express';

import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUsersById);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);

export default userRouter;
