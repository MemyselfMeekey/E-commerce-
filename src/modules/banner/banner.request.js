const Joi=require("joi")
const BannerCreateDto=Joi.object({
    title:Joi.string().min(2).required(),
    url:Joi.string().uri().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().required()
})
const BannerUpdateDto=Joi.object({
    title:Joi.string().min(2).required(),
    url:Joi.string().uri().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.object().optional()
})
module.exports={
    BannerCreateDto,
    BannerUpdateDto
}