class AppError extends Error{//js error class
    constructor({message=null,code=400,data=null}){
        super()
        throw {
            code:code,detail:data,message:message
        }
    }
}
module.exports=AppError