const AppError = require("../../exception/app.exception")
const CatModel = require("./category.model")
const CatModel= require("./category.model")
const slugify=require("slugify")
class CategoryService{
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
            formattedData.image=null
        }
        if(data.parentId==="null"||data.parentId===null||data.parentId===''){
            formattedData.parentId=null
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
    createCat=async(data)=>{
        try{
            const brand=new CatModel(data)
            return await brand.save()
        }
        catch(exception){
            throw exception
        }
    }
    getTotalCount=async(filter)=>{
        try{
            const count=await CatModel.countDocuments(filter)
            return count
        }
        catch(exception){
            throw exception
        }
    }
    getDataById=async(id)=>{
        try{
            const data=await CatModel.findById(id)
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
            const data=await CatModel.find(filter)
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
            const update=await CatModel.findByIdAndUpdate(id,{
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
            const deleteBrand=await CatModel.findByIdAndDelete(id)
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

const catSvc=new CategoryService()
module.exports=catSvc