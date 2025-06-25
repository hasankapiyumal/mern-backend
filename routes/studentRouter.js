import express from "express";
import { createStudent, deleteStudent, getStudents } from "../controllers/studentController.js";


const StudentRouter = express.Router();
StudentRouter.get("/",getStudents);

StudentRouter.post("/",createStudent);

StudentRouter.delete("/",deleteStudent);

export default StudentRouter;