const {EventEmitter}=require("events")
const authSvc=require("../modules/auth/auth.service")
const myEvent=new EventEmitter()


myEvent.addListener("sendRegisterMail",async(data)=>{
    await authSvc.sendRegisterEmail(data)
})


module.exports=myEvent

