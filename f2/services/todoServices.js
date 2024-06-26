import Todo from '../models/todoModel.js';

const todoServise = {
    createTodo: async (newTodoData, owner) => {
        const { title, description, due } = newTodoData;
        return Todo.create({ title, description, due, owner });
    },
    getTodosList: async (filter, user) => {
        const todos = await Todo.find().populate('owner');
        return { todos, total: todos.length };
    },
};

export default todoServise;
