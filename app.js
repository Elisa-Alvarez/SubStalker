import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import authRouterRouter from './routes/auth.routes.js'
import dbConnection from './database/mongodb.js';

const app = express();

app.use('/', (req,res)=>{
    res.send("Hello Subscriber")
});

app.use('/api/v1/auth', authRouterRouter)

app.use('/api/v1/users', userRouter)

app.use('/api/v1/subs', subscriptionRouter)

app.listen(PORT,()=>{
    console.log(`This app is running on localhost:${PORT}`)
})

await dbConnection()

export default app
