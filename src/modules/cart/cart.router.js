const loginCheck = require("../../middleware/auth.middleware")
const validateBody = require("../../middleware/bodyvalidator.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const cartCtrl = require("./cart.controller")
const { AddToCartDto, RemoveToCartDto,OrderDto } = require("./cart.request")

const router=require("express").Router()

router.post('/create',loginCheck,checkPermission(['customer','admin']),validateBody(AddToCartDto),cartCtrl.addToCart)

router.post('/remove',loginCheck,checkPermission(['customer','admin']),validateBody(RemoveToCartDto),cartCtrl.removeFromCart)
router.get("/list",loginCheck,checkPermission(['customer','admin']),cartCtrl.listMyCart)
router.delete("/:cartId",loginCheck,checkPermission(['customer','admin']),cartCtrl.deleteFromCart)
router.post("/order",loginCheck,checkPermission(['customer','admin']),validateBody(OrderDto),cartCtrl.createOrder)

module.exports=router