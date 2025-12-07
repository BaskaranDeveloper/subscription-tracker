import mongoose from 'mongoose';
import {DB_URI,NODE_ENV} from '../config/env.js';

//1. check if DB URL have or not
if(!DB_URI){
//     throw error
    throw new Error('Please provide a valid DB_URL');
}



//connect
const connectToDatabase  = async ()=>{
//     use try catch
    try {
    //     connect db
        await mongoose.connect(DB_URI);
    // log
        console.log(`Connected to Database: ${NODE_ENV} mode`);

    }catch (e){
        console.log(`Error connecting to database: ${e}`);
    //     exit using code =1
        process.exit(1)
    }
}

export  default connectToDatabase;