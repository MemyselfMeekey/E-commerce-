const AppError = require("../../exception/app.exception")
const BrandModel= require("./brand.model")
const slugify=require("slugify")
class BrandService{
    transformCreateObject=(data, authUserId)=>{
       try{ 
        const formattedData={
            ...data
        }
        //slug
        formattedData.slug=slugify(data.name,{lower:true})//string dtaa bata slug banauna milcha slugify bata
        if(data.image){
            formattedData.image=formattedData.image.filename
        }
        else{
            data.image=null
        }
        formattedData.createdBy=authUserId
        return formattedData
    }
    catch(exception){
        throw exception
    }
    }
    transformUpdateObject=(data,oldBrand,authUserId)=>{
        try{
        let formattedData={
            ...data
        }
        console.log("oldBrand",oldBrand)
        if(data.image){
            formattedData.image=data.image.filename
        }
        else{
            formattedData.image=oldBrand.image
        }
        formattedData.updatedBy=authUserId
        console.log("new data", formattedData)
        return formattedData
    }
    catch(exception){
        console.log("I am here TUO")
        throw exception
    }
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
            console.log("I am here get data by id")
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
            console.log("I am here in updateDaata")
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