import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req,res){
    if(!isCustomer(req)){
        res.json({
            "message":"Please Login as a customer to create an order"
        })
        return;
    }
    //take the lastest product id

    try{
        const latestOrderId=await Order.find().sort({date:-1}).limit(1);
        let orderId;

        if(latestOrderId.lenght==0){
            orderId="CBC0001";
        }else{
            const currentOrderId=latestOrderId[0].orderId;
            const numberString=currentOrderId.repalce("CBC","");
            const number=parseInt(numberString);
            const newNumber=(number+1).toString().padStart(4,"0");
            orderId="CBC"+newNumber
        }
         
        const newOrderData=req.body

        const newProductArray=[]
        for(let i=0; i<newOrderData.orderItems[i]; i++){
            try {
                 const product =await Product.findOne({
                productId:newOrderData.orderItems[i].productId
            })

            if(product==null){
                res.json({
                    "message":"Product with id "+newOrderData.orderItems[i].productId+" not found"
                })
                return;


            }
            
            newProductArray[i]={
                name:product.productName,
                price:product.price,
                quantity :newOrderData[i].quantity,
                image:product.images[0]
                

            }
        
            } catch (error) {
                res.json({
                    "message":error
                })
                return;
            }
           
        }

        newOrderData.orderItems=newProductArray

        
        newOrderData.orderId=orderId;
        newOrderData.email=req.user.email;
        const newOrder=new Order(newOrderData);
        await newOrder.save();
        res.json({
            "message":"order created"
        })
    } catch(error){
        res.json({
            "message":error
        })
    }


}