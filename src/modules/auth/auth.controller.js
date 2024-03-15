
require("dotenv").config()
const { response } = require("express")
const { generateRandomString } = require("../../config/helpers")
const AppError = require("../../exception/app.exception")
const authSvc=require("../auth/auth.service")
const expiryDate=require("../user/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")



class AuthController{
    login=async(req,res,next)=>{
        try{
            const {email,password}=req.body
            const userDetail=await authSvc.getSingleUserByFilter({
                email:email//email ma bhako user provide gardincha
            })
            if(!userDetail){
                throw new AppError({message:"user doesnot existr",code:400,data:{email:"user doesn't exist"}})
            }
            if(!bcrypt.compareSync(password,userDetail.password)){//(givenpasword, database pass)check
                throw new AppError({message:"password doesnot match",code:400})
            }
            if(userDetail.status!=="active"){
                throw new AppError({message:"User not activated",code:400})
            }
             
            //otp code of 4 character generate go in databse and update the userdetail and send the client then make a api which send otp in email



            //generatetoken=JWT
            //const accessToken 
            const accessToken=jwt.sign({
                id: userDetail._id,
            },process.env.JWT_SECRET,{
                expiresIn:"4h"
            })//token ma signature add

            const refreshToken=jwt.sign({
                id: userDetail._id,
                type:"refresh"
            },process.env.JWT_SECRET,{
                expiresIn:"1d"
            })
            //token, refresh token===>personal access token==>userId,token,refeshToken 
            const token=await authSvc.personalAcessTokens({
                userId:userDetail._id,
                token:accessToken,
                refreshToken:refreshToken
            })     
            // TODO: Store in PAT
            res.json({
                result:{
                    accessToken:accessToken,
                    refreshToken:refreshToken,
                    
                },
                message:"Welcome to application",
                meta:null
            })
        }

        catch(exception){
            next(exception)
        }
    }
    getLoggedinUser=(req,res,next)=>{

        try{
            const loggedinUser=req.authUser
            res.json({
                result:{
                    _id:loggedinUser._id,
                    name:loggedinUser.name,
                    email:loggedinUser.email,
                    role:loggedinUser.role,
                    status:loggedinUser.status
                },
                message:"Your profile",
                meta:null
            })
        }   
        catch(exception){
            next(exception)
        }
    }
    changepassword=async(req,res,next)=>{
        try{
            const payload=req.body//containas oldpass,newpass,confirmpas
            const loggedinUser=req.authUser
           
            if(!bcrypt.compareSync(payload.oldPassword, loggedinUser.password)){
                throw new AppError({message:"Old password doesn't match",code:400})
            }
            const hash=bcrypt.hashSync(payload.password,10)
            await authSvc.updateUser(loggedinUser._id,{
                password:hash
            })
            res.json({
                result:null,
                message:"Password updated successfully",
                meta:null
            })
        }
        catch(exception){
         next(exception)   
        }
    }
    register=async (req,res,next)=>{
    try{
        //params,query,body
        const data=authSvc.transformRegisterData(req.body)
        //    const timestamp=Date.now()//number=1979-01-01
        //    timestamp+=3*60*60*1000
        //    date=new Date(timestamp)
        //todo:data store
       
        const user=await authSvc.storeUser(data)//data will store email,name ,phone etc
       
        if (user){
        const myEvent= req.myEvent
        myEvent.emit('sendRegisterMail',user)

        //  await authSvc.sendRegisterEmail(data)
        //events
        //--events, polling,
        //validate using joi  
        //file upload--/req.file /req.files
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

    
    verifyRegisterToken=async (req,res,next)=>{
        try{
            const token=req.params.token
            if(token.length<100){
                throw new AppError({message:"Invalid token"})
            }
            const user=await authSvc.getSingleUserByFilter({
                activationToken:token
            })

            if(!user){
                throw new AppError({message:"Token does not exist"})
            }
            const today=new Date().getTime()
            const tokenExpiryDate=new Date(user.expiryDate).getTime()

            if(today>tokenExpiryDate){
                throw new AppError({message:"token has been already expired"})
            }
            res.json({
                result:user,
                message:"Verified",
                meta:null
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    resendActivationToken=async (req,res,next)=>{
        try{
                const email=req.body.email
                const user=await authSvc.getSingleUserByFilter({
                    email:email
                })
                if(!user){
                    throw new AppError({message:"User has not been registered yet"})
                }
                
                    const token=generateRandomString()
                    const expiryDate=new Date()
                    expiryDate.setHours(expiryDate.getHours()+2)

                    await authSvc.updateUser(user._id,{
                        activationToken:token,
                        expiryDate:expiryDate
                    })

                    const myEvent=req.myEvent;
                    myEvent.emit("sendRegisterMail",{name:user.name,email:user.email,activationToken: token})
                    res.json({
                        result:{
                            activationToken: token,
                            expiryDate:expiryDate
                        },
                        message:"this is updated",
                        meta:null
                    })
                
                 
                
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    activateUser=async(req,res,next)=>{
        try{
            const token=req.params.token
            const user=await authSvc.getSingleUserByFilter({
                activationToken:token
            })
            if(!user){
                throw new AppError({message:"Invalid token"})
            }
            const today=new Date().getTime()
            const expiryDate=new Date(user.expiryDate).getTime()
            if(today>expiryDate){
                throw new AppError({message:"Token has alredy been expired"})
            }
            const hash=bcrypt.hashSync(req.body.password,10)
            const updateBody={
                password:hash,
                activationToken:null,
                expiryDate:null,
                status:"active",
            }
            const update=await authSvc.updateUser(user._id,updateBody)
            //todo:event send notification
            res.status(200).json({
                result:null,
                message:"Your account has been succesfully acitivated.Please login to continue",
                meta:null
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    forgetpassword=async(req,res,next)=>{
        try{
            const email=req.body.email
            const userDetail=await authSvc.getSingleUserByFilter({
                email:email
            })
            if(!userDetail){
                throw new AppError({message:"USER has not been registered yet",status:400})
            }
            const token=generateRandomString()//100 char token
            const expiryDate=new Date(Date.now()+(2*60*60*1000))
            const updateBody={
                forgetToken:token,
                expiryDate:expiryDate
            }
            const update=await authSvc.updateUser(userDetail._id, updateBody)
            if(update){
                //send token
                await authSvc.sendForgetPassEmail({email:userDetail.email,name:userDetail.name,token:token})
                res.json({
                    result:updateBody,
                    message:"Please check your email"
                })
            }
            else{
                throw new AppError({message:"Sorry! your request cannot be processed at this moment",code:400})
            }
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
        
    }
    verifyForgetPasswordToken=async(req,res,next)=>{
        console.log("This is verifyforgetpasswordtoken")
        try{
            const token=req.params.token
            if(token.length<100){
                throw new AppError({message:"Invalid token"})
            }
            const user=await authSvc.getSingleUserByFilter({
                forgetToken:token
            })

            if(!user){
                throw new AppError({message:"Token does not exist"})
            }
            const today=new Date().getTime()
            const tokenExpiryDate=new Date(user.expiryDate).getTime()

            if(today>tokenExpiryDate){
                throw new AppError({message:"token has been already expired for forget-password"})
            }
            res.json({
                result:{
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                forgetToken:user.forgetToken,
                expiryDate:user.expiryDate,
                role:user.role,
                status: user.status
                },
                message:"Verified",
                meta:null
            })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    updatepassword=async(req,res,next)=>{
        try{
            const payload=req.body
            const user= await authSvc.getSingleUserByFilter({
                forgetToken:req.params.token
            })
            if(!user){
                throw new AppError({message:"Token does not exist"})
            }
            const today=new Date().getTime()
            const tokenExpiryDate=new Date(user.expiryDate).getTime()

            if(today>tokenExpiryDate){
                throw new AppError({message:"token has been already expired for updating the password"})
            }
            await authSvc.updateUser( user._id,{
                password:bcrypt.hashSync(payload.password),
                forgetToken:null,
                expiryDate:null
            })
           res.json({
            result:"Password changed successfully",
            data:null,
            meta:null
           })
        }
        catch(exception){
            console.log(exception)
            next(exception)
        }
    }
//     logout=async(req,res,next)=>{//delete
//        try{
//         let token=req.headers.authroization
//         if(token){
//             token=token.split(" ").pop()
//             await authSvc.deleteAcessTokens(token)
//             res.status(200).json({
//                 message:"logout successful"
//             })
//         }
//        }
//        catch(exception){
//         console.log(exception)
//         next(exception)
//        }

// }
}
const authCtrl=new AuthController()
module.exports=authCtrl