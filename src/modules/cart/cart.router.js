const loginCheck = require("../../middleware/auth.middleware")
const validateBody = require("../../middleware/bodyvalidator.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const cartCtrl = require("./cart.controller")
const { AddToCartDto } = require("./cart.request")

const router=require("express").Router()

router.post('/create',loginCheck,checkPermission(['customer','admin']),validateBody(AddToCartDto),cartCtrl.addToCart)

module.exports=router