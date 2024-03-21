const Joi = require("joi");

const AddToCartDto=Joi.object({
    productId:Joi.string().required(),
    quantity:Joi.number().min(1)
})
module.exports={
    AddToCartDto
}