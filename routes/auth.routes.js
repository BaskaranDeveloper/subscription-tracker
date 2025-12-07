import {Router} from "express"

const authRoutes = Router();

//Sign Up route
authRoutes.post("/sign-up",(req, res)=> res.send({title:"Sign Up",message:"Sign Up API"}));
authRoutes.post("/sign-in",(req, res)=> res.send({title:"Sign In",message:"Sign In API"}));
authRoutes.post("/sign-out",(req, res)=> res.send({title:"Sign Out"}));


export  default  authRoutes;