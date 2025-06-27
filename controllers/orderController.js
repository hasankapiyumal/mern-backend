import Order from "../models/order.js";

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
        newOrderData.orderId=orderId;
        newOrderData.email=req.user.email;
        const newOrder=new Order(newOrderData);
        await newOrder.save();
        res.json({
            "message":"order created"
        })

        


    }catch(error){
        res.json({
            "message":error
        })
    }


}