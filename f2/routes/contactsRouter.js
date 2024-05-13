import express from 'express';

import {
    createContact,
    deleteContact,
    getAllContact,
    getOneContact,
    updateContact,
    updateStatusContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();
contactsRouter.get('/', getAllContact);
contactsRouter.get('/:id', getOneContact);
contactsRouter.delete('/:id', deleteContact);
contactsRouter.post('/', createContact);
contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);
contactsRouter.patch('/:id/favorite', validateBody(updateContactSchema), updateStatusContact);

// contactsRouter.route('/').get(getAllContacts).post(createContact)

// contactsRouter.route('/:id',).get(getOneContact).delete(deleteContact).patch(updateContact)

export default contactsRouter;
