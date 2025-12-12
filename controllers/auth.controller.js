import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
export const signUp = async (req,res,next)=>{
    const session = await mongoose.startSession();
    //mongoose transaction session
    session.startTransaction();
    try {
    // Create a new user
        const {name,email,password} = req.body;
    //     Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error =  new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }

    //     if desn't exists hash the password using bcrypt
        const salt  = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name,email,password:hashPassword}],{session});

    //     token for user
        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});




await session.commitTransaction();
session.endSession();

res.status(201).json({
    success: true,
    message:"User created successfully",
    data:{
        token,
        user:newUsers[0]
    }
})
    }catch (e){
        await session.abortTransaction();
        session.endSession();
        next(e);
    }

};

export const signIn = async (req,res,next)=>{};

export const signOut= async (req,res,next)=>{};

