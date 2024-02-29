require("dotenv").config()
const nodemailer=require("nodemailer")
class MailService{
    #transporter
    constructor(){
        try{
            this.#transporter=nodemailer.createTransport({
                host:'sandbox.smtp.mailtrap.io',
                port: 587,
                secure: false,
                auth:{
                    user: 'a4eaaab0c5f541',
                    pass:'a0790d076f789f'
                }
            })
        
        }
        
        catch(exception){
            console.log("mail connection error",exception)
            throw exception
        }
    }
    sendEmail=async({to,subject,html=null,text})=>{ //async
        try{
            const status=await this.#transporter.sendMail({//await
                to:to,
                subject:subject,
                from:process.env.SMTP_FROM,
                html:html,
                text: text || html,
        })
           return status
        }
        catch(exception){
            console.log("exception for send email",exception)
            throw exception
        }
    }
}
module.exports=new MailService()