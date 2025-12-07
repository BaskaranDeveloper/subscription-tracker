import  express from "express";
// import port
import  {PORT} from  "./config/env.js"

import  authRouter from "./routes/auth.routes.js"
import  userRouter from "./routes/user.routes.js"
import  subscriptionRouter from "./routes/subscription.routes.js"
import connectToDatabase from "./database/mongodb.js";


const app = express();

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);


app.get("/",(req,res)=>{
    res.send("Welcome to the Subscription Tracker!");
});


app.listen(PORT,async ()=>{
    console.log("Server is running on  http://localhost:" + PORT);

    // conect db

   await connectToDatabase();
});


