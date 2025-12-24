import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import authRouterRouter from './routes/auth.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import dbConnection from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import arcjectMiddleware from './middleware/arcjet.middleware.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

app.use(arcjectMiddleware);

app.use('/api/v1/auth', authRouterRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/subs', subscriptionRouter);

app.use(errorMiddleware);

await dbConnection();

app.listen(PORT,()=>{
    console.log(`This app is running on localhost:${PORT}`)
});



export default app
