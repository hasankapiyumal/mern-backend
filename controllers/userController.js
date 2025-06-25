import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export function createUser(req,res){
    const userData =req.body;
    userData.password =bcrypt.hashSync(userData.password,10);
    const user =new User(userData);

    user.save().then(()=>{
        res.json({
            "message":"user created"
        })
    }).catch(()=>{
        res.json({
            "message":"user not created"
        })
    })
}

export function loginUser(req,res){
    User.find({email:req.body.email}).then(
    (userlist)=>{
        if(userlist.length==0){
            res.json({
                message:"user not found"
            })
        }else{
            const user=userlist[0];
            const isPasswordMatched=bcrypt.compareSync(req.body.password,user.password);
            if(isPasswordMatched){
                const token=jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    type:user.type,
                    isBlocked:user.isBlocked,
                    type:user.type,
                    profilePicture:user.profilePicture
                },"cbc-sercret-key-009");
    
                res.json({
                    "message":"user logged in"
                })
            }else{
                res.json({
                    "message":"invalid password"
                })
            }
        }

    })
}