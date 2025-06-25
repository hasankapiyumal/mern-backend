import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const userRouter=express.Router();
userRouter.get("/",(req,res)=>{
    res.json({
        "message":"hello user"
    })
})

userRouter.post("/",createUser);
userRouter.post("/login",loginUser);

export default userRouter;