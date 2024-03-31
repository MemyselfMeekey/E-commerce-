const { boolean } = require("joi")
const mongoose=require("mongoose")
const OrderModelSchema=new mongoose.Schema({
    buyerId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    cartItems:[
        {
            type:mongoose.Types.ObjectId,
            ref:"CartModel",
            required:true
        }
    ],
    subTotal:{
        type:Number,
        required:true,
        min:1
    },
    discount:{
        type:Number,
        min:0,
        default:0
    },
    deliveryCharge:{
        type:Number,
        default:100
    },
    tax:{
        type:Number,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled","completed"],
        default:"pending"
    },
    isPaid:{
        type:Boolean,
        deault:false
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})
const OrderModel=mongoose.model("Order",OrderModelSchema)
module.exports=OrderModel