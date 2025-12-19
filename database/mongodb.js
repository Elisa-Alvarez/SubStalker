import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("Please defone your database uri in .env.<development/production>.local")
}

const dbConnection = async () =>{
    try{
       await mongoose.connect(DB_URI)
       console.log(`Connected to the database in ${NODE_ENV} mode`)
    }
    catch{
        console.error('Error connecting to the database', error);
        process.exit(1)
    }
}

export default dbConnection