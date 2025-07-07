import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "only admin can Add products",
    });
    return;
  }
  const product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.json({
        message: "product created",
      });
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
}

export function getProducts(req, res) {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.json({
        message: error,
      });
    });
}

export function deleteProduct(req, res) {
  if (isAdmin(req)) {
    Product.deleteOne({ productId: req.params.productId })
      .then(() => {
        res.status(200).json({
          message: "product deleted",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error,
        });
      });
  } else {
    res.status(401).json({
      message: "only admin can delete products",
    });
    return;
  }

}
  export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.json({
            message:"only admin can update products"
        });
        return;
    }
    const productId=req.params.productId;
    Product.updateOne({productId:productId},req.body)
      .then(()=>{
        res.json({
          message:"product updated"
        });
      })
      .catch((error)=>{
        res.json({
          message:error
        });
      });
  }

  export function getProductById(req,res){
    const proudctId =req.params.productId;
  if(proudctId==null){
    res.json({
      message:"product id is required"
    });
    return;
  }

  Product.findById({proudctId:proudctId}).then((product)=>{
    res.json(product);
  }).catch((error)=>{
    res.status(500).json({
      message:error
    });
  })
  }
