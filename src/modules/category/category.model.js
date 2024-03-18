const mongoose=require("mongoose")
const CatSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        min:2,
    },
    slug:{type:String, required:true, unique:true},
    image:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },
    parentId:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        default:null
    },
    showInHome:{
        type:Boolean,
        default:false,
    },
    showInMenu:{
        type:Boolean,
        default:false,
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
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true,
})
const CatModel=mongoose.model("Category",CatSchema)
module.exports=CatModel