const bannerSvc = require("./banner.service")
const AppError=require("../../exception/app.exception")

class banController{
    index=async(req,res,next)=>{
        try{
            //authv1/banner?page=1&limit=15
            const page=+req.query.page || 1
            const limit=+req.query.limit || 15
            if(page<=0 || limit<=0){
                throw new AppError({message:"Page numebr should begin frm 1",code:400})
            }
            const offset=(page-1)*limit
            const filter={}
             //authv1/banner?page=1&limit=15&seach=banner
            if(req.query.search){
                filter={
                    $or:[
                        {title:new RegExp(req.query.search,'i')},
                        {url:new RegExp(req.query.search,'i')},
                        {status:new RegExp(req.query.search,'i')}
                    ]
                }

            }
            //pagination
            //1-100
            //per page 15=>1st page=>1-15
            //2nd page=>id=>16-30
            //search operation
            const count=await bannerSvc.getTotalCount(filter)
            const data=await bannerSvc.getDataByFilter({offset,filter,limit})
            res.json({
                result:data,
                message:"Banner Fetched",
                meta:{
                    page:page,
                    limit:limit,
                    count:count
                }
            })
        }
        catch(exception){
            next(exception)
        }
    }
    create=async(req,res,next)=>{
        try{
            console.log(req.authUser)
            const payload=bannerSvc.transformCreateObject(req.body,req.authUser._id)
            const banner=await bannerSvc.createBanner(payload)
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }

    }
   view=async(req,res,next)=>{
    try{
        const id=req.params.id
        if(!id){
            throw new AppError({message:"Id is requiredd",code:"400"})
        }
        const detail=await bannerSvc.getDataById(id)
            if(!detail){
                throw new AppError({message:"anner doesnot exitst",code:400})
            }
            res.json({
                result:detail,
                message:"Banner Detail Fecthed",
                meta:null
            })  
    }
    catch(exception){
        throw exception
        next(exception)
    }
    }
   update=(req,res,next)=>{

    }
    delete=(req,res,next)=>{

    }
    listforhome=(req,res,next)=>{

    }
}
let banCtrl=new banController()//makes a function
module.exports=banCtrl