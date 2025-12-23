import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import bcrypt from "bcryptjs"


export const signUp = async (req, res, next) =>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const {name, email, password} = req.body

    const exsistingUser = await User.findOne({email});
    if(exsistingUser){
        const err = new Error('User already exsists')
        err.statusCode = 409;
        throw err;
    }
    //hash psw
    const salt = await bcrypt.genSalt(15);
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

}
export const signOut = async (req, res, next) =>{

}