const Joi = require("joi");

const AddToCartDto=Joi.object({
    productId:Joi.string().required(),
    quantity:Joi.number().min(1).required()
})
const RemoveToCartDto=Joi.object({
    productId:Joi.string().required(),
    quantity:Joi.number().min(0).required()
})
const OrderDto=Joi.object({
    cartId:Joi.array().items(Joi.string().required()).required(),
    discount:Joi.number().min(0).default(0),
    deliveryCharge:Joi.number().min(100).default(100)
})
module.exports={
    AddToCartDto,
    RemoveToCartDto,
    OrderDto
}