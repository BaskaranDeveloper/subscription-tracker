import  express from "express";
// import port
import  {PORT} from  "./config/env.js"
import  cookieParser from "cookie-parser";
import  authRouter from "./routes/auth.routes.js"
import  userRouter from "./routes/user.routes.js"
import  subscriptionRouter from "./routes/subscription.routes.js"
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();

app.use(express.json());  //json handling send and req
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);


// midlewares
app.use(errorMiddleware);

app.get("/",(req,res)=>{
    res.send("Welcome to the Subscription Tracker!");
});


app.listen(PORT,async ()=>{
    console.log("Server is running on  http://localhost:" + PORT);

    // conect db

   await connectToDatabase();
});


