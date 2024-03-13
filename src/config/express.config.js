const express=require('express')//es5 module
require("./db.config")
const app=express()
const router=require("../routes/router")
const myEvent=require("../events/event.config")
const { MongooseError } = require('mongoose')


app.use((req,res,next)=>{
    req.myEvent= myEvent
    next()
})

app.use("/images",express.static('./public/uploads'))
app.use("/users",express.static('./public/uploads/user'))

// body parser
app.use(express.json())//json body phrases
app.use(express.urlencoded({//x-www-form-urlencoded
    extended:false
}))

app.use('/authv1',router) 
 //use is also a middleware also known as application level middleware

app.use((req,res,next)=>{
    next({code:404, message:"Not found",detail:""})
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("Garbage Collector",err)
    //garbage collector
    //error object=> code,message
    
    let code=err.code || 500;
    let data=err.detail || {}
    let message=err.message || "Server err"

    if(err.code===11000){//this if if mongo db server failerd to connect
        const keys=Object.keys(err.keyPattern)
        console.log({keys})
        keys.map((fieldName)=>{
            data[fieldName]=fieldName+"should be unique"
        })
        message="validation failed"
        code=422
    }

    res.status(code).json({
        result:data,
        message:message,
        meta:null
    })
     
})

module.exports=app
