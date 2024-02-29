const validateBody=(schema)=>{
    return async(req,res,next)=>  {
        try{
            const data=req.body
           
            if(req.files){
                Object.keys(req.files).map((fileField)=>{
                    data[fileField]=req.files[fileField]
            })
            }else if(req.file){
                data[req.file.fieldname]=req.file
            }
            // console.log({payload:data})
            // const response=await schema.validateAsync(data)
            const response=await schema.validateAsync(data,{abortEarly:false})
            // if(response.hasOwnProperty('error')){
            //     throw response.error
           next()
        }
        catch(exception){
            let errors={}
            console.log(exception)
            exception.details.map((err)=>{
                errors[err.context.label]=err.message
            })
            next({details:errors,code:422,message:"validation failed"})
        }
    }
}
module.exports=validateBody