import Todo from '../models/todoModel.js';

const todoServise = {
    createTodo: async (newTodoData, owner) => {
        const { title, description, due } = newTodoData;
        return Todo.create({ title, description, due, owner });
    },
    getTodosList: async (query, user) => {},
};

export default todoServise;
