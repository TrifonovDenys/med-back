import todoServise from '../services/todoServices.js';
import catchAsync from '../utils/catchAsync.js';

const todoController = {
    createTodo: catchAsync(async (req, res) => {
        const newTodo = await todoServise.createTodo(req.body, req.user);

        res.status(201).json({
            todo: newTodo,
        });
    }),
    getTodosList: catchAsync(async (req, res) => {
        const { todos, total } = await todoServise.getTodosList(req.query, req.user);

        res.status(201).json({
            msg: 'Succsess',
            todos,
            total,
            owner: req.user,
        });
    }),
};

export default todoController;
