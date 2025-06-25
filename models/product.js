import mongoose from "mongoose";

const ProductSchema=mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    
})

const Product=mongoose.model("products",ProductSchema);

export default Product;