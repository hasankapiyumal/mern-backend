import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function createUser(req,res){
    const userData =req.body;
    if(userData.type=="admin"){
        if(req.user==null){
            res.json({
                "message":"please login as admin to create admin accounts"
            })
            return;
        }
    }
    if(req.user.type!="admin"){
        res.json({
            "message":"only admin can create admin accounts"
        })
        return;
    }
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
                },process.env.SECRET_KEY);
    
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

export function isAdmin(req){
    if(req.user==null){
        return false
    }

    if(req.user.type !="admin"){
        return false
    }
    return true
}

export function isCustomer(req){
    if(req.user==null){
        return false
    }

    if(req.user.type !="customer"){
        return false
    }
    return true
}