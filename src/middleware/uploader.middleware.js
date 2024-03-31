//this is used becuse there is image
const multer=require('multer')
const fs=require("fs")
const {generateRandomString}=require("../config/helpers")
const path = require('path')
const myStorage= multer.diskStorage({//where to store files and upload them
    destination:(req,file,cb)=>{
        cb(null,req.uploadPath)//req.uploadPath used to set the destination directory

    },
    filename:(req,file,cb)=>{//this is used to give uploaded file a unique name 
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
    // console.log(req.file)
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