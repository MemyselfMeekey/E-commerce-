const authSvc = require("../auth/auth.service")
const AppError=require("../../../src/exception/app.exception")
const userSvc=require("./user.service")
class UserController{
    registerUser=async(req,res,next)=>{
        try{

            const data=req.body
            
            const transformData=authSvc.transformRegisterData(data)
            const user=await authSvc.storeUser(data)//data will store email,name ,phone etc
            res.json({
                result:data,
                message:"This is all of the users data",
                meta:null
            })
        if (user){
        const myEvent= req.myEvent
        myEvent.emit('sendRegisterMail',user)
        res.json({
            result:user,
            message:"Your user account has been created succesfulyy",
            meta:null
        })
    }
    else{
        throw new AppError({message:"this couldnot be executed"})
    }
 }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    getList=async(req,res,next)=>{
        try{
            const role=req.query.role||null
            const page = +req.query.page || 1
            const limit = +req.query.limit || 15
            if (page <= 0 || limit <= 0) {
                throw new AppError({ message: "Page numebr should begin frm 1", code: 400 })
            }
            const offset = (page - 1) * limit
            
            //authv1/banner?page=1&limit=15&seach=banner
            let filter={}
            if(role){
                    filter={
                        role:role
                    }
            }
            if (req.query.search) {
                filter = {
                    ...filter,
                    deletedAt:{$eq:null},
                    deletedBy:{$eq:null},
                    $or: [
                        { name: new RegExp(req.query.search, 'i') },
                        { status: new RegExp(req.query.search, 'i') }
                    ]
                }
        }
        console.log(filter)
        const count=await userSvc.getCount(filter)
        const userList=await userSvc.listUserByfilter(filter,offset,limit)
        res.json({
            result:userList,
            message:"User list",
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
    getDetail=async(req,res,next)=>{
        try{
            const userId=req.params.userId
            const  userDetail=await userSvc.getSingleUser({_id:userId})
            if(!userDetail){
                throw new AppError({message:"User not found", code:400})
            }
            
            res.json({
                result:userDetail,
                message:"This is user detail",
                meta:null
            })
        }
        catch(exception){
            next(exception)
        }
    }
    updateUser=async(req,res,next)=>{
        try{
            const userId=req.params.userId
            const userDetail=await userSvc.getSingleUser({_id:userId})
            if(!userDetail){
                throw new AppError({message:"This is an error in updateuser"})
            }
            const data=userSvc.transformUpdateData(userDetail,req.body,req.authUser._id)
            const update=await authSvc.updateUser(userId,req.body)
            res.json({
                result:update,
                message:"User updated successfully"
            })
        }
        catch(exception){
            next(exception)
        }
    }
    deleteById=async(req,res,next)=>{
        try{
            const userId=req.params.userId
        const  userDetail=await userSvc.getSingleUser({_id:userId})
            if(!userDetail){
                throw new AppError({message:"User not found", code:400})
            }
            const update=await authSvc.updateUser(userId,{
                deletedAt:new Date(),
                deletedBy:req.authUser._id
            })
            res.json({
                result:userDetail,
                message:"This is user detail",
                meta:null
            })
        }
        catch(exception){
            next(exception)
        }
    }
}
const UserCtrol=new UserController()
module.exports=UserCtrol