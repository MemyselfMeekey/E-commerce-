const Joi=require("joi")
const registerSchema=Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:Joi.string().email().required(),
    role:Joi.string().pattern(/^(admin|seller|customer)$/).default("customer"),//pattern or valid
    phone:Joi.string().min(10).required(),
    image:Joi.object().required()
})  
module.exports={
    registerSchema
}