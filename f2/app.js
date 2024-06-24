import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import authRouter from './routes/authRouter.js';
import contactsRouter from './routes/contactsRouter.js';
import todoRouter from './routes/todoRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config({
    path: process.env.NODE_ENV === 'productions' ? './env/.env.prod' : './env/.env.dev',
});
// { { url } } /api/auth / signup
// {
//     "name": "Michail",
//     "year": "1921",
//     "email": "newuser123@gmail.com",
//     "password": "newpass1"
// }
const app = express();
mongoose
    .connect(process.env.MONGODB)
    // eslint-disable-next-line no-console
    .then(() => console.log('Database connection successful'))
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
        process.exit(1);
    });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
});
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});
