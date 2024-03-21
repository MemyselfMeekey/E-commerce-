const validateBody=(schema)=>{
    return async(req,res,next)=>  {
        try{
            const data=req.body
            if(req.files && req.files.length){
                let images=[]
                let fieldName=""
                Object.keys(req.files).map((index)=>{
                    // data[fileField]=req.files[fileField]
                    const image=req.files[index]
                    images.push(image)
                    fieldName=image.fieldname
                })
                data[fieldName]=images
            }else if(req.file){
                
                data[req.file.fieldname]=req.file
            }

            // const response=await schema.validateAsync(data)
            const response=await schema.validateAsync(data,{abortEarly:false})
            // if(response.hasOwnProperty('error')){
            //     throw response.error
           next()
        }
        catch(exception){
            let errors={}
            // console.log(exception.details)
            exception.details.map((err)=>{
                errors[err.context.label]=err.message
            })
            next({details:errors,code:422,message:"validation failed"})
        }
    }
}
module.exports=validateBody