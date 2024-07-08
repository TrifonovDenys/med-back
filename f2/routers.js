import { Router } from 'express';

import authRouter from './routes/authRouter.js';
import contactsRouter from './routes/contactsRouter.js';
import todoRouter from './routes/todoRouter.js';
import userRouter from './routes/userRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);
router.use('/users', userRouter);
router.use('/todos', todoRouter);

export default router;
