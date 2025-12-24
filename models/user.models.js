import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email:{
        type:String,
        required:[true,"User email is required"],
        unique:true,
        trim: true,
        lowercase: true,
        minLength: 4,
        maxLength: 255,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password:{
        type:String,
        require:[true, "Password is required"],
        minLength: 6,
        maxLength: 70,

    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;