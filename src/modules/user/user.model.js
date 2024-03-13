
const mongoose=require("mongoose")

const AddStructur=new mongoose.Schema({
    state:String,
    district: String,
    localDevCom:String,
    wardNo:Number,
    stnName:String
})


const UserSchemaDef=new mongoose.Schema({
    //column defination except id, date
    name:{
        type: String, //numebr,boolean,object,array,data,objecId
        min:2,
        max:50,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['admin','customer','seller'],
        default:"customer"
    },
    password:String,
    activationToken:String,
    expiryDate:Date,
    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },

    forgetToken:String,

    address:{
        shippingAddress:AddStructur,
        billingAddress:AddStructur
    },

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null,
    },
    updatedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null,
    }

},{
    //configuration options
    timestamps:true,   //created at,updated at columns
    autoCreate:true,
    autoIndex:true

})
const PersonalAcessToken=new mongoose.Schema({
    userId:{
     type:mongoose.Types.ObjectId,
     ref: "User",
     require:true
    },
    token:{
     type:String
    },
    refreshToken:{
     type:String
    }
 },{ timestamps: true })

//default=users but if you want give third parameter for examples auth users
const UserModel=mongoose.model("User",UserSchemaDef)
const PatModel=mongoose.model("UserPat",PersonalAcessToken)
module.exports={UserModel,PatModel}