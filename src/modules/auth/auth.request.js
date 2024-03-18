const Joi=require("joi")
const emailSchema=Joi.string().email().required()
const registerSchema=Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:emailSchema,
    role:Joi.string().pattern(/^(seller|customer)$/).default("customer"),//pattern or valid
    phone:Joi.string().min(10).required(),
    image:Joi.object().required()
})  
const resendToken=Joi.object({
    email:emailSchema
})
const passwordSetSchema=Joi.object({
    password:Joi.string().min(8).max(25).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).messages({'any.only':"confirm password must macth with password"})
})
const loginDto=Joi.object({
    email:emailSchema,
    password:Joi.string().required()
})
const passwordChangeSchema=Joi.object({
    oldPassword:Joi.string().required(),
    password:Joi.string().min(8).max(25).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).messages({'any.only':"confirm password must macth with password"})
})

const forgetPassword=Joi.object({
    email:emailSchema
})

module.exports={
    registerSchema,
   resendToken,
   passwordSetSchema,
   loginDto,
   passwordChangeSchema,
   forgetPassword,
   emailSchema
}