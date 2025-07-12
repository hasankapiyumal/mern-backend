import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin, isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    
  
  if (!isCustomer(req)) {
    res.json({
      message: "Please Login as a customer to create an order",
    });
    return;
  }
  //take the lastest product id

  try {
    const latestOrderId = await Order.find().sort({ date: -1 }).limit(1);
    let orderId;
      

    if (latestOrderId.length == 0) {
      orderId = "CBC0001";
    } else {
      const currentOrderId = latestOrderId[0].orderId;
      const numberString = currentOrderId.repalce("CBC", "");
      const number = parseInt(numberString);
      const newNumber = (number + 1).toString().padStart(4, "0");
      orderId = "CBC" + newNumber;
    
    }
   
      
    const newOrderData = req.body;
    


    const newProductArray = [];
    for (let i = 0; i < newOrderData.orderItems.length; i++) {
      try {
        const product = await Product.findOne({
          productId: newOrderData.orderItems[i].productId,
        });

        if (product == null) {
          res.json({
            message:
              "Product with id " +
              newOrderData.orderItems[i].productId +
              " not found",
          });
          return;
        }

        newProductArray[i] = {
          name: product.productName,
          price: product.lastPrice,
          quantity: newOrderData.orderItems[i].qty,
          image: product.images[0],
        };

       
      } catch (error) {
        res.json({
          message: error,
        });
        return;
      }
    }
      
    newOrderData.orderItems = newProductArray;

    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;
    newOrderData.name = req.body.name;
    newOrderData.address = req.body.address;
    newOrderData.phone = req.body.phone;
    const newOrder = new Order(newOrderData);
    const saveOrder = await newOrder.save();
   
    res.json({
      message: "Order created successfully",
      order: saveOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.json({
      message: error,
    });
  }
}

export async function getOrders(req, res) {
  try {
    if (isCustomer(req)) {
      const orders = await Order.find({ email: req.user.email });
      res.json(orders);
      return;
    }else if(isAdmin(req)){
      const orders = await Order.find([]);
      res.json(orders);
      return;
    }else{
        res.json({
            message: "Please Login as a customer or admin to get orders",
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
}

export async function getQuote(req, res) {
   
  try {
    const newOrderData = req.body;

   
    const newProductArray = [];
    let total = 0;
    let labledTotal = 0;
    for (let i = 0; i < newOrderData.orderItems.length; i++) {
       
    
      try {
       
        const product = await Product.findOne({
          productId: newOrderData.orderItems[i].productId,
          
        });

        console.log("product", product);

        if (product == null) {
          res.json({
            message:
              "Product with id " +
              newOrderData.orderItems[i].productId +
              " not found",
          });
          return;
        }
        labledTotal += product.price * newOrderData.orderItems[i].qty;
        total += product.lastPrice * newOrderData.orderItems[i].qty;

        newProductArray[i] = {
          name: product.productName,
          price: product.lastPrice,
          labledPrice: product.price,
          quantity: newOrderData.orderItems[i].qty,
          image: product.images[0],
        };
      } catch (error) {
        console.log("Error in getQuote:", error);
        res.json({
          message: error,
        });
        return;
      }
    }
   
    newOrderData.orderItems = newProductArray;
    newOrderData.total = total;

    res.json({
      orderItems: newProductArray,
      total: total,
      labledTotal: labledTotal,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
}
