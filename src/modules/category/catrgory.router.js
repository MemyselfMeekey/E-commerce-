const router=require("express").Router()

const loginCheck = require("../../middleware/auth.middleware")
const categoryCtrl=require("./category.controller")

router.get("/",loginCheck,categoryCtrl.index)
router.post("/",loginCheck,categoryCtrl.create)
router.get("/:id",loginCheck,categoryCtrl.view)
router.put("/:id",loginCheck,categoryCtrl.update)
router.delete("/:id",loginCheck,categoryCtrl.delete)
router.get("/:slug/products",loginCheck,categoryCtrl.categoryproducts)

module.exports=router