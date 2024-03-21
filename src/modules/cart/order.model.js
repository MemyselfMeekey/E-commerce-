const mongoose=require("mongoose")
const OrderModelSchema=new mongoose.Schema({
    
})
const OrderModel=mongoose.model("Order",OrderModelSchema)
module.exports=OrderModel