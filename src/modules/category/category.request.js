const Joi=require("joi")
const CatCreateDto=Joi.object({
    title:Joi.string().min(2).required(),
    
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional(),
    showInHome:Joi.boolean().default(false)
})
const CatUpdateDto=Joi.object({
    title:Joi.string().min(2).required(),
    
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional(),
    showInHome:Joi.boolean().default(false)
})
module.exports={
    CatCreateDto,
    CatUpdateDto
}