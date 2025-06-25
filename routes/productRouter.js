import express from "express";
import { createProduct, deleteProduct, getProductByName, getProducts } from "../controllers/productController.js";

const productRouter = express.Router();
productRouter.get("/",getProducts);
productRouter.get("/:name",getProductByName);
productRouter.post("/",createProduct);
productRouter.delete("/",deleteProduct);

export default productRouter;
