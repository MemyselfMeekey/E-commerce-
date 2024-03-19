const AppError = require("../../exception/app.exception")
const ProModel= require("./product.model")
const slugify=require("slugify")
class ProService{
    transformCreateObject=(data, authUser)=>{
        const formattedData={
            ...data
        }
        //slug
        formattedData.slug=slugify(data.name,{lower:true})
        let images=[]
        if(data.images){
            data.images.maps((images)=>{
                images.push(images.filename)
            })
        }
        if(images.length){
            formattedData.images=images
        }
        else{
            formattedData.images=null
        }
      
        if(!data.categories || data.categories==="null"||data.categories===''){
            formattedData.categories=null
        }
        if(!data.brand || data.brand==="null"||data.brand===''){
            formattedData.brand=null
        }
        if(!data.seller || data.seller==="null"||data.seller===''){
            formattedData.seller=null
        }
        formattedData.afterDiscount=data.price-data.price*data.discount/100
        if(authUser.role==='seller'){
            formattedData.status='inactive',
            formattedData.seller=authUser._id
        }
        formattedData.createdBy=authUser
        return formattedData
    }
    transformUpdateObject=(data,oldProduct,authUserId)=>{
        const formattedData={
            ...data
        }
        //slug
        formattedData.slug=slugify(data.name,{lower:true})
        let images=oldProduct.images
        if(data.images){
            data.images.maps((images)=>{
                images.push(images.filename)
            })
        }
        if(images.length){
            formattedData.images=images
        }
        else{
            formattedData.images=null
        }
      
        if(!data.categories || data.categories==="null"||data.categories===''){
            formattedData.categories=null
        }
        if(!data.brand || data.brand==="null"||data.brand===''){
            formattedData.brand=null
        }
        if(!data.seller || data.seller==="null"||data.seller===''){
            formattedData.seller=null
        }
        formattedData.afterDiscount=data.price-data.price*data.discount/100
        
        formattedData.createdBy=authUserId      
        return formattedData
    }
    createCat=async(data)=>{
        try{
            const pro=new ProModel(data)
            return await pro.save()
        }
        catch(exception){
            throw exception
        }
    }
    getTotalCount=async(filter)=>{
        try{
            const count=await ProModel.countDocuments(filter)
            return count
        }
        catch(exception){
            throw exception
        }
    }
    getDataById=async(id)=>{
        try{
            const data=await ProModel.findById(id)
            .populate('createdBy',['_id','name','email'])
            .populate('parentId',['_id',"name",'slug'])
            return data
        }
        catch(exception){
            throw exception
        }
    }


    getDataByFilter=async({offset,filter,limit})=>{
        try{
            const data=await ProModel.find(filter)
            .populate('createdBy',['_id','name','email'])//user table column
            .sort('categories',['_id'])
            .skip(offset)
            .limit(limit)
            return data
        }
        catch(exception){
            throw exception
        }
    }
    updateData=async(id,data)=>{
        try{
            const update=await ProModel.findByIdAndUpdate(id,{
                $set:data
            })
            return update
        }
        catch(exception){
            throw exception
        }
    }
    deleteById=async(id)=>{
        try{
            const deletePro=await ProModel.findByIdAndDelete(id)
            if(!deletePro){
                throw new AppError({message:"Pro doesnot exists",code:400})
            }
            return deletePro
        }
        catch(exception){
            throw exception
        }
    }
}

const ProSvc=new ProService()
module.exports=ProSvc