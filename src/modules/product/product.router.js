const router=require("express").Router()

const loginCheck=require("../../middleware/auth.middleware")
const productCtrol=require("./product.controller")
const checkPermission=require("../../middleware/rbac.middleware")
const {pathSet,uploader}=require("../../middleware/uploader.middleware")
const validateBody=require("../../middleware/bodyvalidator.middleware")
const { ProCreateDto,ProUpdateDto } = require("./product.request")

// router.get("/menu",productCtrol.listforhome)
router.post('/',loginCheck,checkPermission('admin','seller'),pathSet('/uploads/product'),uploader.array('images'),validateBody(ProCreateDto),productCtrol.create)

router.get('/',loginCheck,checkPermission('admin','seller'),productCtrol.index)


router.get("/:id",loginCheck,checkPermission('admin'),productCtrol.view)
router.put("/:id",loginCheck,checkPermission('admin'),pathSet('/uploads/product'),uploader.array('images'),validateBody(ProUpdateDto),productCtrol.update)
router.delete("/:id",loginCheck,checkPermission('admin'),productCtrol.delete)

router.get("/home/list",productCtrol.listforhome)
router.get("/:slug/byslug",productCtrol.dataBySlug)


module.exports=router