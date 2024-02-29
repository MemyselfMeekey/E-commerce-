const {generateRandomString}=require('../../config/helpers')
const MailService=require("../../services/mail.service")
class AuthService{
    transformRegisterData=(data)=>{
        try{
         //data is received
          data.status="inactive"//login control
           const token= generateRandomString()
           data.activationToken=token
           const date=new Date()
           
           date.setHours(date.getHours()+3)//current time+3hrs
            data.tokenExpiry=date
            return data;
        }
        catch(exception){
            throw exception
        }
    } 
    sendRegisterEmail=async(user)=>{
        try{
            const mailSend=await MailService.sendEmail({
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
}

const authSvc=new AuthService()
module.exports=authSvc