const express=require('express')//es5 module

const app=express()
const router=require("../routes/router")

// body parser
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use('/authv1',router) 
 //use is also a middleware also known as application level middleware

app.use((res,req,next)=>{
    next({code:404, message:"Not found",detail:""})
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("Garbage Collector",err)
    //garbage collector
    //error object=> code,message

    let code=err.code || 500;
    let data=err.detail || null
    let message=err.message || "Server err"



    res.status(code).json({
        result:data,
        message:message,
        meta:null
    })
     
})

module.exports=app
