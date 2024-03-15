const router=require("express").Router()

const loginCheck=require("../../middleware/auth.middleware")
const brandCtrol=require("./brand.controller")
const checkPermission=require("../../middleware/rbac.middleware")
const {pathSet,uploader}=require("../../middleware/uploader.middleware")
const validateBody=require("../../middleware/bodyvalidator.middleware")
const { BrandCreateDto,BrandUpdateDto } = require("./brand.request")

router.post('/',loginCheck,checkPermission('admin'),pathSet('/uploads/brand'),uploader.single('image'),validateBody(BrandCreateDto),brandCtrol.create)

router.get('/',loginCheck,checkPermission('admin'),brandCtrol.index)


router.get("/:id",loginCheck,checkPermission('admin'),brandCtrol.view)
router.put("/:id",loginCheck,checkPermission('admin'),pathSet('/uploads/banner'),uploader.single('image'),validateBody(BrandUpdateDto),brandCtrol.update)
router.delete("/:id",loginCheck,checkPermission('admin'),brandCtrol.delete)

router.get("/home/list",loginCheck,checkPermission('admin'),brandCtrol.listforhome)
router.get("/:slug/byslug",brandCtrol.dataBySlug)


module.exports=router