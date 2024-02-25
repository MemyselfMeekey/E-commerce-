const router=require("express").Router()

const loginCheck=require("../../middleware/auth.middleware")
const banCtrol=require("./banner.controller")

router.get("/",loginCheck,banCtrol.index)
router.post("/",loginCheck,banCtrol.create)

router.get("/:id",loginCheck,banCtrol.view)
router.put("/:id",loginCheck,banCtrol.update)
router.delete("/:id",loginCheck,banCtrol.delete)

router.get("/home/list",loginCheck,banCtrol.listforhome)


module.exports=router