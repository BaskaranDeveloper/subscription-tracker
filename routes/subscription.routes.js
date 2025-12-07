import  {Router}   from "express";
const subscriptionRoutes = Router();


// 1. Get all subscription
subscriptionRoutes.get("/",(req,res)=> res.send({title:"POST User",message:"Get All Subscriptions"}));

// 2. Get Subscription by SubID
subscriptionRoutes.get("/:id",(req,res)=>res.send({title:"Get Sub by ID",message:"Get Subscription"}));

// 3. Create Subscription
subscriptionRoutes.post("/:id",(req,res)=>res.send({title:"POST Subscription",message:"Create Subscription"}));

// 4. Update subscription
subscriptionRoutes.put("/:id",(req,res)=>res.send({title:"PUT Subscription",message:"Update Subscription"}));

// 5. Delete subscription
subscriptionRoutes.delete("/:id",(req,res)=>res.send({title:"DELETE Subscription",message:"Delete Subscription"}));

// 6. Get all users subscription
subscriptionRoutes.get("/users/:id", (req,res)=>res.send({title:"GET Users Subscriptions",message:"Get All Users Subscription"}));

// 7. Cancel user subscription
subscriptionRoutes.put("/:id/cancel",(req,res)=> res.send({title:"PUT Subscription",message:"Update Subscription"}));

// 8. Upcoming renewels
subscriptionRoutes.get("/upcoming-renewals",(req,res)=> res.send({title:"PUT Subscription",message:"Upcoming Subscription"}));

export default subscriptionRoutes;