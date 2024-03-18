const loginCheck = require("../../middleware/auth.middleware")
const validateBody = require("../../middleware/bodyvalidator.middleware")
const checkPermission = require("../../middleware/rbac.middleware")
const {pathSet,uploader}=require("../../middleware/uploader.middleware")
const  userCreateDto  = require("./user.request")
const UserCtrol = require("./user.controller")

const router=require("express").Router()

router.route("/")
    .post(loginCheck,checkPermission('admin'),pathSet('/uploads/cat'),uploader.single('image'),validateBody(userCreateDto),UserCtrol.registerUser)
    .get(loginCheck,checkPermission('admin'),UserCtrol.getList)
module.exports=router
