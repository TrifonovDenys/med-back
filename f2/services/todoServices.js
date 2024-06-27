import Todo from '../models/todoModel.js';

const todoServise = {
    createTodo: async (newTodoData, owner) => {
        const { title, description, due } = newTodoData;
        return Todo.create({ title, description, due, owner });
    },
    getTodosList: async (filter, user) => {
        // SEARCH
        const findOptions = filter.search
            ? {
                  $or: [
                      { title: { $regex: filter.search, $options: 'i', owner: user } },
                      { description: { $regex: filter.search, $options: 'i' } },
                  ],
              }
            : {};

        if (filter.search && user.role === 'user') {
            for (const searchOptions of findOptions.$or) searchOptions.owner = user;
        }
        if (!filter.search && user.role === 'user') {
            findOptions.owner = user;
        }

        // initialization database query
        const todosQuery = Todo.find(findOptions).populate({ path: 'owner', select: 'name email role ' }).sort('-title');
        // SORT
        // order = 'ASC' | 'DESC'
        // .sort('title') | .sort('-description')
        // todosQuery.sort(`${filter.order === 'DESC' ? '-' : ''}${filter.sort || 'title'}`);

        // PAGINATION FEATURE
        // .limit(10) - limit of docs in DB response
        // .skip(10) - counts of docs to skip
        // page 1 limit(10) skip(0)
        // page 2 limit(10) skip(10)
        // page 3 limit 10 skip 20

        const paginationPage = filter.page ? +filter.page : 1;
        const paginationLimit = filter.page ? +filter.limit : 5;
        const docsToSkip = (paginationPage - 1) * paginationLimit;

        todosQuery.skip(docsToSkip).limit(paginationLimit);

        const todos = await todosQuery;
        const total = await Todo.count(findOptions);
        return { todos, total: todos.length };
    },
};

export default todoServise;
