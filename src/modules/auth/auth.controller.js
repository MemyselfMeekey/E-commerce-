const joi=require("joi")

class AuthController{
    login=(req,res,next)=>{

    }
    getLoggedinUser=(req,res,next)=>{

    }
    changepassword=(req,res,next)=>{
        
    }
    register=(req,res,next)=>{
    try{
        //params,query,body
        const data=req.body
          
        //validate using joi  
            
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