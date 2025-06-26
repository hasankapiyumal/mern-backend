import Product from "../models/product.js";

export async function getProducts(req, res) {
    try{
    const productList= await Product.find();
    res.json({
        list: productList,
    });

}catch(err){
    console.log(err);
    res.json({
        "message":"Error"
    })
}
    // Product.find().then((productList) => {
    //     res.json({
    //         list: productList,
    //     });
    // });
}

export function createProduct(req, res) {
    const product = new Product(req.body);
    if(req.user==null){
        res.json({
            "message":"user not logged in"
        })
        return;
    }
    if(req.user.type!="admin"){
        res.json({
            "message":"user not admin"
        })
        return;
    }
    product.save(req.body).then(()=>{
        res.json({
            "message":"product created"
        })
    }).catch(()=>{
        res.json({
            "message":"product not created"
        })
    })
}

export function deleteProduct(req, res) {

    Product.deleteOne({name:req.body.name}).then(()=>{
        res.json({
            "message":"product deleted"
        })
    }).catch(()=>{
        res.json({
            "message":"product not deleted"
        })
    })
}

export function getProductByName(req,res){
    const name=req.params.name;
    Product.find({name:name}).then(
        (productList)=>{
        res.json({
            list:productList
        })
        }
    ).catch(()=>{
        res.json({
            "message":"product not found"
        })
    })
}
