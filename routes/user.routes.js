import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req,res)=> res.send({message:'All users'}));
userRouter.post('/', (req,res)=> res.send({message:'Create users'}));
userRouter.patch('/:id', (req,res)=> res.send({message:'Update user'}));
userRouter.get('/:id', (req,res)=> res.send({message:'Get user by id'}));
userRouter.delete('/:id', (req,res)=> res.send({message:'Delete user by id'}));

export default userRouter