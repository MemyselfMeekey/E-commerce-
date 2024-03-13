const bannerModel = require("./banner.model")

class BannerService{
    transformCreateObject=(data, authUserId)=>{
        const formattedData={
            ...data
        }
        formattedData.image=formattedData.image.filename
        formattedData.createdBy=authUserId
        return formattedData
    }
    createBanner=async(data)=>{
        try{
            const banner=new bannerModel(data)
            return await banner.save()
        }
        catch(exception){
            throw exception
        }
    }
    getTotalCount=async(filter)=>{
        try{
            const count=await bannerModel.countDocuments(filter)
            return count
        }
        catch(exception){
            throw exception
        }
    }
    getDataById=async(id)=>{
        try{
            const data=await bannerModel.findById(id)
            .populate('createdBy',['_id','name','email'])//
        }
        catch(exception){
            throw exception
        }
    }


    getDataByFilter=async({offset,filter,limit})=>{
        try{
            const data=await bannerModel.find(filter)
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
}

const bannerSvc=new BannerService()
module.exports=bannerSvc