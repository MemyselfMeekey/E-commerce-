const Joi=require("joi")
const CatCreateDto=Joi.object({
    name:Joi.string().min(2).required(),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional(),
    showInHome:Joi.boolean().default(false),
    showInMenu:Joi.boolean().default(false),
    parentId:Joi.string().allow(null,'')
})
const CatUpdateDto=Joi.object({
    name:Joi.string().min(2).required(),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional(),
    showInHome:Joi.boolean().default(false),
    showInMenu:Joi.boolean().default(false),
    parentId:Joi.string().allow(null,'')
})
module.exports={
    CatCreateDto,
    CatUpdateDto
}