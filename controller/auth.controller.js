import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import bcrypt from "bcryptjs"
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const {name, email, password} = req.body
    if (!name || !email || !password) {
      const err = new Error('Name, email, and password are required')
      err.statusCode = 400;
      throw err;
    }
    const exsistingUser = await User.findOne({email});
    if(exsistingUser){
        const err = new Error('User already exsists')
        err.statusCode = 409;
        throw err;
    }
    //hash psw
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);
    const newUser = await User.create([{name,email,password:hashedPass}],{session})
    const token = jwt.sign({userId:newUser[0]._id}, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN})

    await session.commitTransaction(); 
    session.endSession();
    res.status(201).json({success:true, message: 'User Created Successfully', data:{token, user:newUser[0]}})
  }
  catch (err){
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
}
export const signIn = async (req, res, next) =>{
 try{
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err
  }

  const isPassValid = await bcrypt.compare(password,user.password);

  if(!isPassValid){
    const err = new Error('Invalid Credentials');
    err.statusCode = 401;
    throw err
  }
  const token = jwt.sign({userId: user._id}, JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
   res.status(200).json({success:true, message:'User signed in successfully', data:{token,user}})
 }catch(err){
  next(err);
 }
}
export const signOut = async (req, res, next) =>{

}