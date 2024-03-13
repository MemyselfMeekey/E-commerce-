require("dotenv").config
const AppError = require("../exception/app.exception")
const jwt=require("jsonwebtoken")
const authSvc=require("../modules/auth/auth.service")
const loginCheck=async(req,res,next)=>{
   try{
    let token=req.headers['authorization'] || null
    if(!token){
        throw new AppError({message:"Token is required",code:401})
    }
    token=token.split(" ").pop()
    if(!token){
        throw new AppError({message:"NO token",code:401})
    }

    const data=jwt.verify(token,process.env.JWT_SECRET)
    if(data.hasOwnProperty('type')&&data.type==="refresh"){
        throw new AppError({message:"Use Acess Token",code:403})
    }
    const personalAt=await authSvc.getPATData(token)
    if(personalAt){
        
        const userDetail=await authSvc.getSingleUserByFilter({
            _id: data.id
        })
        
        if(!userDetail){
            throw new AppError({message:"user doesnot exist anymore",code:401})
        }else{
            
            req.authUser=userDetail;
            next()
        }
    }
    else{
        throw new AppError({message:"User already logged Out",code:401})
    }}
   catch(exception){
    console.log(exception)
    const errorObj=exception
    if(exception instanceof jwt.JsonWebTokenError){
        errorObj['message']=exception.message
        errorObj['code']=401
    }
    next(errorObj)
   }
    
}

module.exports=loginCheck
