
require("dotenv").config()
const joi=require("joi")
const MailService=require("../../services/mail.service")
const authSvc=require("../auth/auth.service")
class AuthController{
    login=(req,res,next)=>{

    }
    getLoggedinUser=(req,res,next)=>{

    }
    changepassword=(req,res,next)=>{
        
    }
    register=async (req,res,next)=>{
    try{
        //params,query,body
        const data=authSvc.transformRegisterData(req.body)
        //    const timestamp=Date.now()//number=1979-01-01
        //    timestamp+=3*60*60*1000
        //    date=new Date(timestamp)

         await authSvc.sendRegisterEmail(data)
        res.json({
            result:mailSend,
            message:"YOUR ACCOUNT HAS BEEN CREATED SUCCESFULLY"
            
        })
        //validate using joi  
        //file upload--/req.file /req.files
    }
    catch(exception){
        console.log(exception)
        next(exception)
    }
    }

    
    verifyRegisterToken=(req,res,next)=>{

    }
    activateUser=(req,res,next)=>{

    }
    forgetpassword=(req,res,next)=>{
        
    }
    verifyForgetPasswordToken=(req,res,next)=>{

    }
    setpassword=(req,res,next)=>{

    }


}
const authCtrl=new AuthController()
module.exports=authCtrl