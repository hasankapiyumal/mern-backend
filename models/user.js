import mongoose from "mongoose";
 const userSchema=mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },

     firstName:{
        type:String,
        required:true
     },

     lastName:{
        type:String,
        required:true
     },

     password:{
        type:String,
        required:true
     },

     isBlocked:{
        type:Boolean,
        default:false
     },

     type:{
        type:String,
        default:"customer"
     },

     profilePicture:{
        type:String,
        default:"https://www.flaticon.com/free-icon/user_847969?term=profile+picture&page=1&position=7&origin=tag&related_id=847969"
     }


    
 })

const User=mongoose.model("users",userSchema);
export default User;