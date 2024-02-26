const validateBody=(schema)=>{
    return async(req,res,next)=>  {
        try{
            const data=req.body
            await schema.validateAsync(data,{})
            next()
        }
        catch(exception){
            let errors={}
            exception.details.map((err)=>{
                errors[err.context.label]=err.message
            })
            next({details:errors,code:422,message:"validation failed"})
        }
    }
}
module.exports=validateBody