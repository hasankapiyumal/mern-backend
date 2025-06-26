import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import StudentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();


const app = express();

<<<<<<< HEAD
const mongoUrl =process.env.MONOGO_DB_URI;
=======
const mongoUrl = '########';
>>>>>>> a918d724cf2e3da14791b7ffb392d1dbc0afe73b
mongoose.connect(mongoUrl,{});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});


app.use(bodyParser.json());
app.use((req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer ","");
    if(token!=null){
        jwt.verify(token,"cbc-sercret-key-009",(error,decoded)=>{
            if(!error){
               
                req.user=decoded;
            }
        })
    }
    next();
});

app.use('/api/students', StudentRouter);
app.use('/api/products', productRouter);
app.use("/api/users",userRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
