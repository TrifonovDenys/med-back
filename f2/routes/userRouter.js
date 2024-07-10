import express from 'express';
import fs from 'fs';
import multer from 'multer';

import userController from '../controllers/user/userController.js';
import { allowFor, protect } from '../middlewares/authMiddleware.js';
import { checkCreateUserData, checkUpdateMyData, checkUpdateUserData } from '../middlewares/userMiddleware.js';

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const userId = req.user._id;
        const { folder } = req.query;
        const locationPath = `./upload/users/${folder}/${userId}/`;
        fs.mkdirSync(locationPath, { recursive: true });
        cb(null, locationPath);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });
// Analogy to CheckAuth
userRouter.use(protect);

userRouter.get('/get-me', userController.getMe);
userRouter.patch('/update-me', upload.single('file'), checkUpdateMyData, userController.updateMe);
userRouter.patch('/avatar/:id', upload.single('file'), userController.updateUserAvatar);
// Router.patch('/update-my-password', )

userRouter.use(allowFor('admin', 'moderator'));
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', checkCreateUserData, userController.createUser);
userRouter.patch('/:id', checkUpdateUserData, userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
