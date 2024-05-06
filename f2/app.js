import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import contactsRouter from './routes/contactsRouter.js';

dotenv.config({
    path: process.env.NODE_ENV === 'productions' ? './env/prod.env' : './env/dev.env',
});

const app = express();

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    // eslint-disable-next-line no-console
    .then((con) => console.log('Database connection successful'))
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        process.exit(1);
    });

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
