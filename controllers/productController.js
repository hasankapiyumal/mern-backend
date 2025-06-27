import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){
    if(!isAdmin(req)){
        res.json({
            "message":"only admin can Add products"
        })
        return;
    }
    const product =new Product(req.body);
    product.save().then(()=>{
        res.json({
            "message":"product created"
        })
    }).catch((error)=>{
        res.json({
            "message":error
        })
    })


}


export function getProducts(req,res){
    Product.find().then((products)=>{
        res.json(products)
    }).catch((error)=>{
        res.json({
            "message":error
        })
    })
}