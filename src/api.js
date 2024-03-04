import bodyParser from 'body-parser';
import userRouter from './routes/user.routes.js';
import chatRouter from './routes/chat.routes.js'
import { authenticateUser } from './middlewares/auth.middleware.js';
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.json());

// routers
app.use('/user', userRouter);
app.use('/chat', authenticateUser, chatRouter);

export default app;