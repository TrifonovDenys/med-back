import Joi from 'joi';

const todosValidator = Joi.object().options({ abortEarly: false }).keys({
    title,
    description,
    due,
    complited,
});
