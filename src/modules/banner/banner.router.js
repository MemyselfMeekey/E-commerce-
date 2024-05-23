const router=require("express").Router()

const loginCheck=require("../../middleware/auth.middleware")
const banCtrol=require("./banner.controller")
const checkPermission=require("../../middleware/rbac.middleware")
const {pathSet,uploader}=require("../../middleware/uploader.middleware")
const validateBody=require("../../middleware/bodyvalidator.middleware")
const { BannerCreateDto,BannerUpdateDto } = require("./banner.request")

router.post('/',loginCheck,checkPermission('admin'),pathSet('/uploads/banner'),uploader.single('image'),validateBody(BannerCreateDto),banCtrol.create)

router.get('/',loginCheck,checkPermission('admin'),banCtrol.index)


router.get("/:id",loginCheck,checkPermission('admin'),banCtrol.view)
router.put("/:id",loginCheck,checkPermission('admin'),pathSet('/uploads/banner'),uploader.single('image'),validateBody(BannerUpdateDto),banCtrol.update)
router.delete("/:id",loginCheck,checkPermission('admin'),banCtrol.delete)

router.get("/home/list",banCtrol.listforhome)


module.exports=router