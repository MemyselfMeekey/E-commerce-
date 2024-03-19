
const router=require("express").Router()
const loginCheck = require("../../middleware/auth.middleware")
const validateBody = require("../../middleware/bodyvalidator.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const {pathSet,uploader}=require("../../middleware/uploader.middleware")
const  {userCreateDto,userUpdateDto}  = require("./user.request")
const UserCtrol = require("./user.controller")


router.route("/")
    .post(loginCheck,checkPermission('admin'),pathSet('/uploads/user'),uploader.single('image'),validateBody(userCreateDto),UserCtrol.registerUser)
    .get(loginCheck,checkPermission('admin'),UserCtrol.getList)
router.route("/:userId")
    .get(loginCheck,checkPermission('admin'),UserCtrol.getDetail)
    .put(loginCheck,checkPermission('admin'),pathSet('/uploads/user'),uploader.single('image'),validateBody(userUpdateDto),UserCtrol.updateUser)
    .delete(loginCheck,checkPermission('admin'),UserCtrol.deleteById)
   
module.exports=router
