import express from 'express';

import { createUser, deleteUser, getAllUser, getOneUser, updateStatusUser, updateUser } from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllUser);

contactsRouter.get('/:id', getOneUser);

contactsRouter.delete('/:id', deleteUser);

contactsRouter.post('/', createUser);

contactsRouter.put('/:id', validateBody(updateContactSchema), updateUser);

contactsRouter.patch('/:id/favorite', validateBody(updateContactSchema), updateStatusUser);

// contactsRouter.route('/').get(getAllContacts).post(createContact)

// contactsRouter.route('/:id',).get(getOneContact).delete(deleteContact).patch(updateContact)

export default contactsRouter;
