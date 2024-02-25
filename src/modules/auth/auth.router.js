const router=require('express').Router()//express routing middleware

const loginCheck=require("../../middleware/auth.middleware")//..goes two step back in folder

const authCtrl=require("./auth.controller")

//http://localhost:3005/api/v1/auth/login
router.post("/login",authCtrl.login)
router.get("/me",loginCheck,authCtrl.getLoggedinUser)
router.post("/change-password",loginCheck,authCtrl.changepassword)

router.post("/register",authCtrl.register)
router.get("/verify-token/:token",authCtrl.verifyRegisterToken)
router.get("/activate/:token",authCtrl.activateUser)

router.post("/forget-password",authCtrl.forgetpassword)
router.post("/forget-password/:token/verify",authCtrl.verifyForgetPasswordToken)
router.post("/set-password/:token",authCtrl.setpassword)


module.exports=router