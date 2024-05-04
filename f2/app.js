import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import contactsRouter from './routes/contactsRouter.js';

dotenv.config({
    path: (process.env.NODE_ENV === 'productions' ? './env/prod.env' : './env/dev.env'),
});

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});
