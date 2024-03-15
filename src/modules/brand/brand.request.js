const Joi=require("joi")
const BrandCreateDto=Joi.object({
    title:Joi.string().min(2).required(),
    
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional(),
    showInHome:Joi.boolean().default(false)
})
const BrandUpdateDto=Joi.object({
    title:Joi.string().min(2).required(),
    
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional(),
    showInHome:Joi.boolean().default(false)
})
module.exports={
    BrandCreateDto,
    BrandUpdateDto
}