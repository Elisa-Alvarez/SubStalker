import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up',(req,res) => res.send({message:'Welcome Here'}));
authRouter.post('/sign-in',(req,res) => res.send({message:'Welcome Back'}));
authRouter.post('/sign-out',(req,res) => res.send({message:'Goodbye'}));

export default authRouter