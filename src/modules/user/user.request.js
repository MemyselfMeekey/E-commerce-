const Joi = require("joi")
const {emailSchema}=require("../auth/auth.request")
const userCreateDto = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: emailSchema,
    role: Joi.string().pattern(/^(admin|seller|customer)$/).default("customer"),//pattern or valid
    phone: Joi.string().min(10).required(),
    image: Joi.object().required(),
    address: Joi.object({
        shippingAddress:Joi.object ({
            state: Joi.string().pattern(/^(Koshi|Madesh|Sudurpaschim|Lumbini|Gandaki|Bagmati|Karnali)$/),
            district: Joi.string().allow(null,''),
            localDevCom: Joi.string().allow(null,''),
            wardNo: Joi.number().allow(null,''),
            stnName: Joi.string().allow(null,'')
        }),
        billingAddress:Joi.object ({
            state: String,
            district: Joi.string().allow(null,''),
            localDevCom: Joi.string().allow(null,''),
            wardNo: Joi.number().allow(null,''),
            stnName: Joi.string().allow(null,'')
        })
    })
})
module.exports = userCreateDto