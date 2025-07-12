import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
const orderRouter=express.Router();

orderRouter.post("/",createOrder);
orderRouter.get("/quote",getOrders);

export default orderRouter;
