import { Router } from 'express';

import todoController from '../controllers/todoController.js';
import { protect } from '../middlewares/authMiddleware.js';

const todoRouter = Router();

todoRouter.use(protect);

todoRouter.post('/', todoController.createTodo);
todoRouter.get('/', todoController.getTodosList);

export default todoRouter;
