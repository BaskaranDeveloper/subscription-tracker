import {Router} from "express";

const userRoutes = Router();

// 1. Get All users
userRoutes.get("/", (req, res) => res.send({title: "GET All Users"}));

// 2. Get User By userID
userRoutes.get("/:id", (req, res) => res.send({title: "GET User details"}));

// 3. Create New User
userRoutes.post("/",(req,res)=> res.send({title:"POST User",message:"Create User"}));

// 4. Update User by userID
userRoutes.put("/:id",(req,res)=> res.send({title:"PUT User",message:"Update User"}));

// 5. Delete User by userID
userRoutes.delete("/:id",(req,res)=> res.send({title:"DELETE User",message:"Delete User"}));

export  default userRoutes;