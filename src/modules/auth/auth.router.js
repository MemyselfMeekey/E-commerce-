const router=require('express').Router()//express routing middleware

const loginCheck=require("../../middleware/auth.middleware")//..goes two step back in folder

const {uploader,pathSet}=require("../../middleware/uploader.middleware")
const authCtrl=require("../auth/auth.controller")
const {registerSchema, resendToken, passwordSetSchema, loginDto, passwordChangeSchema, forgetPassword}=require("../auth/auth.request")
const validatebody=require("../../middleware/bodyvalidator.middleware")



//uploader.none,single,array
router.post("/register",pathSet("/uploads/user"),uploader.single("image"), validatebody(registerSchema), authCtrl.register);
router.get("/verify-token/:token",authCtrl.verifyRegisterToken)
router.post("/resend-token",validatebody(resendToken),authCtrl.resendActivationToken)
router.get("/activate/:token",validatebody(passwordSetSchema),authCtrl.activateUser)

//http://localhost:3005/apiv1/auth/login
router.post("/login",validatebody(loginDto),authCtrl.login)
// router.get("/logout",loginCheck,authCtrl.logout)
// router.get("/refresh",authCtrl.refreshToken)
router.get("/me",loginCheck,authCtrl.getLoggedinUser)
router.post("/change-password",loginCheck,validatebody(passwordChangeSchema),authCtrl.changepassword)

router.post("/forget-password",validatebody(forgetPassword),authCtrl.forgetpassword)
router.get("/forget-password/:token/verify",authCtrl.verifyForgetPasswordToken)
router.post("/set-password/:token",validatebody(passwordSetSchema),authCtrl.updatepassword)


module.exports=router