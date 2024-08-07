import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import soketIO from 'socket.io';

import router from './routers.js';

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
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/upload', express.static('upload'));

app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(err.status || 500).json({
        message: err.message || 'Server error',
        text: err.stack,
    });
});
const server = app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running. Use our API on port: ${process.env.PORT}`);
});

const io = soketIO(server);

io.on('connection', (socket) => {
    console.log('Socket conected..');
    socket.emit('message', () => {
        msg: 'hello from socket!!';
    });
    socket.on;
});
