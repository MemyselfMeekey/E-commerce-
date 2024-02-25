const router=require('express').Router()
const loginCheck=require("../../middleware/auth.middleware")
const brandCtrl=require("./brand.controller")

router.get("/",loginCheck,brandCtrl.index)
router.post("/",loginCheck,brandCtrl.create)
router.get("/:id",loginCheck,brandCtrl.view)
router.put("/:id",loginCheck,brandCtrl.update)
router.delete("/:id",loginCheck,brandCtrl.delete)
router.get("/:slug/products",loginCheck,brandCtrl.productsFromSlug)

module.exports=router
