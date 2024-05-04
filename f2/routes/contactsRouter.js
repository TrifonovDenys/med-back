import express from 'express';

import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.delete('/:id', deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), createContact);

contactsRouter.put('/:id', validateBody(updateContactSchema), updateContact);

// contactsRouter.route('/').get(getAllContacts).post(createContact)

// contactsRouter.route('/:id',).get(getOneContact).delete(deleteContact).patch(updateContact)

export default contactsRouter;
