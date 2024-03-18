const router=require("express").Router()

const loginCheck=require("../../middleware/auth.middleware")
const catCtrol=require("./category.controller")
const checkPermission=require("../../middleware/rbac.middleware")
const {pathSet,uploader}=require("../../middleware/uploader.middleware")
const validateBody=require("../../middleware/bodyvalidator.middleware")
const { CatCreateDto,CatUpdateDto } = require("./category.request")

// router.get("/menu",catCtrol.listforhome)
router.post('/',loginCheck,checkPermission('admin'),pathSet('/uploads/cat'),uploader.single('image'),validateBody(CatCreateDto),catCtrol.create)

router.get('/',loginCheck,checkPermission('admin'),catCtrol.index)


router.get("/:id",loginCheck,checkPermission('admin'),catCtrol.view)
router.put("/:id",loginCheck,checkPermission('admin'),pathSet('/uploads/banner'),uploader.single('image'),validateBody(CatUpdateDto),catCtrol.update)
router.delete("/:id",loginCheck,checkPermission('admin'),catCtrol.delete)

router.get("/home/list",loginCheck,checkPermission('admin'),catCtrol.listforhome)
router.get("/:slug/byslug",catCtrol.dataBySlug)


module.exports=router