import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

// 1. Get All users
userRouter.get("/",getUsers);

// 2. Get User By userID
userRouter.get("/:id",authorize, getUser);

// 3. Create New User
userRouter.post("/",(req,res)=> res.send({title:"POST User",message:"Create User"}));

// 4. Update User by userID
userRouter.put("/:id",(req,res)=> res.send({title:"PUT User",message:"Update User"}));

// 5. Delete User by userID
userRouter.delete("/:id",(req,res)=> res.send({title:"DELETE User",message:"Delete User"}));

export  default userRouter;