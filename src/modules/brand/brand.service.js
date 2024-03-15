const AppError = require("../../exception/app.exception")
const BrandModel= require("./brand.model")
const slugify=require("slugify")
class BrandService{
    transformCreateObject=(data, authUserId)=>{
        const formattedData={
            ...data
        }
        //slug
        formattedData.slug=slugify(data.name,{lower:true})
        if(data.image){
            formattedData.image=formattedData.image.filename
        }
        else{
            data.image=null
        }
        
        formattedData.createdBy=authUserId
        return formattedData
    }
    transformUpdateObject=(data,oldBanner,authUserId)=>{
        let formattedData={
            ...data
        }
        if(data.image){
            formattedData.image=data.image.filename
        }
        else{
            formattedData.image=oldBrand.image
        }
        formattedData.updatedBy=authUserId
        return formattedData
    }
    createBrand=async(data)=>{
        try{
            const brand=new BrandModel(data)
            return await brand.save()
        }
        catch(exception){
            throw exception
        }
    }
    getTotalCount=async(filter)=>{
        try{
            const count=await BrandModel.countDocuments(filter)
            return count
        }
        catch(exception){
            throw exception
        }
    }
    getDataById=async(id)=>{
        try{
            const data=await BrandModel.findById(id)
            .populate('createdBy',['_id','name','email'])//
            return data
        }
        catch(exception){
            throw exception
        }
    }


    getDataByFilter=async({offset,filter,limit})=>{
        try{
            const data=await BrandModel.find(filter)
            .populate('createdBy',['_id','name','email'])//user table column
            .sort({'_id':"desc"})
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
            const update=await BrandModel.findByIdAndUpdate(id,{
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
            const deleteBrand=await BrandModel.findByIdAndDelete(id)
            if(!deleteBrand){
                throw new AppError({message:"Brand doesnot exists",code:400})
            }
            return deleteBrand
        }
        catch(exception){
            throw exception
        }
    }
}

const brandSvc=new BrandService()
module.exports=brandSvc