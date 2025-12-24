import { Router } from "express";
import {getUser, getUsers} from '../controller/user.controller.js'
import authorize from '../middleware/auth.middleware.js'
import errorMiddleware from "../middleware/error.middleware.js";

const userRouter = Router()

userRouter.get('/',getUsers);
userRouter.post('/', (req,res)=> res.send({message:'Create users'}));
userRouter.patch('/:id', (req,res)=> res.send({message:'Update user'}));
userRouter.get('/:id',authorize, errorMiddleware, getUser);
userRouter.delete('/:id', (req,res)=> res.send({message:'Delete user by id'}));

export default userRouter