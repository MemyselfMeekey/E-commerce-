const {generateRandomString}=require('../../config/helpers')
const AppError = require('../../exception/app.exception')
const MailService=require("../../services/mail.service")
const {UserModel, PatModel}=require("../user/user.model")
// const PatModel=require("../user/user.model")


class AuthService{
    transformRegisterData=(data)=>{
        try{
         //data is received
          data.status="inactive"//login control
           const token= generateRandomString()
           
           data.activationToken=token
           const date=new Date()
           
           date.setHours(date.getHours()+3)//current time+3hrs
            data.expiryDate=date
            return data;
        }
        catch(exception){
            throw exception
        }
    } 
    sendRegisterEmail=async(user)=>{
        try{
           await MailService.sendEmail({
                to:user.email,
                subject:"Activate your account",
                html:`
                Dear <b> ${user.name}</b>,</br>
                <p>Your account has been registered successfully. Please click the link below to activate your account or copy psatethe url</p>
                <a href="${process.env.FRONTEND_URL}activate/${user.activationToken}">${process.env.FRONTEND_URL}</a><br>
                <b> Regards</b>
                `,
                text:`
                Dear ${user.name}\n
                Your account has been registered successfully. Please click the link below to activate your account or copy psatethe url\n
                ${process.env.FRONTEND_URL}activate/${user.activationToken}\n
                Regards\n
                `
            })
        }
        catch(exception){
              throw exception  
        }
    }  
    sendForgetPassEmail=async({email,name,token})=>{
        try{
           await MailService.sendEmail({
                to:email,
                subject:"Reset Your Password",
                html:`
                Dear <b> ${name}</b>,</br>
                <p>You have requesten for the password change.</p><br>
                <p>if this is your request please click the link below, or ignore the request</p>
                <p>Your account has been registered successfully. Please click the link below to activate your account or copy psatethe url</p>
                <a href="${process.env.FRONTEND_URL}chaneg-password/${token}/verify">${process.env.FRONTEND_URL}chaneg-password/${token}/verify
                </a><br>
                <p>Your link is activated only for 2 hours</p>
                <b> Regards</b>
                `,
                text:`
                Dear ${name}\n
                You have requested to password change
                if this is your request, please coy and paste the link below, or ignore this mesage
                
                ${process.env.FRONTEND_URL}activate/${token}\n
                Regards\n
                `
            })
        }
        catch(exception){
              throw exception  
        }
    }  
    storeUser=async(data)=>{
        try{
            // const user=UserModel.insertOne(data)
            const user= new UserModel(data)
           return await user.save()//promise return garcha//this runs insert and update 
        }
        catch(exception){
            throw exception
        }
    }
    getSingleUserByFilter=async (filter)=>{
        try{
            const user=await UserModel.findOne(filter) 
            return user;
        }
        catch(exception){
            throw exception
        }
    }
    getPATData = async (token) => {
        try {
            const data = await PatModel.findOne({
                token: token
            })
            return data;
        } catch(exception) {
            throw exception
        }
    }

    personalAcessTokens=async({userId,token,refreshToken})=>{
        try{
            const user= new PatModel({userId,token,refreshToken})
            return await user.save()
            }
            catch(exception){
                throw exception
            }
        }
     

    deleteAcessTokens=async(userId,token,refreshToken)=>{
        try{
            const personalToken=await pat.deleteOne({
                userId:userId,
                token:token,
                refreshToken:refreshToken
            })
            return personalToken
        }
        catch(exception){
            throw exception
        }
    }
    
    updateUser=async(id,data)=>{
        try{
            // const update=await UserModel.updateOne({
            //     _id:id
            // },{
            //  $set:data
            // })
            const update=await UserModel.findByIdAndUpdate(id,{
                $set:data
            })
            if(!update){
                throw new AppError({message:"User doesnot exist"})
            }
            return update
        }
        catch(exception){
            throw exception
        }
    }
}

const authSvc=new AuthService()
module.exports=authSvc