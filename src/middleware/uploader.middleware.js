//this is used becuse there is image
const multer=require('multer')
const fs=require("fs")
const {generateRandomString}=require("../config/helpers")
const path = require('path')
const myStorage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,req.uploadPath)

    },
    filename:(req,file,cb)=>{
        //name.ext
        const ext=file.originalname.split(".").pop()
        const filename=Date.now()+"-"+generateRandomString(15)+"."+ext//1970-01-01
        //123439-_nsja12.jpg
        cb(null,filename)
    }
})
const pathSet=(dirPath)=>{
    return(req,res,next)=>{
        const path='./public'+dirPath
        //path=>public/uploads/user
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
        req.uploadPath=path
        next()
    }
}
const imageFilter=(req,file,cb)=>{
    const ext=file.originalname.split(".").pop()
    const allowedExt=['jpg','jpeg','png','svg','bmp','webp','gif']
    if(allowedExt.includes(ext.toLowerCase())){
        cb(null,true)
    } 
    else{
        cb({message:"Invalid File image format",code:400})
    }
}

const uploader=multer({
    storage:myStorage,
    fileFilter:imageFilter,
    limits:{
        fileSize:5000000
    }
})

module.exports={uploader,pathSet}