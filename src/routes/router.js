const router=require('express').Router() //router obj used to define rouutes and middleware for a specific part of your application  //middleware
const authRouter=require("../modules/auth/auth.router")
const bannerRouter=require("../modules/banner/banner.router")
const brandRouter=require("../modules/brand/brand.router") 
const userRouter=require("../modules/user/user.router")
const category=require("../modules/category/category.router")

//loading auth.router export on auth end point 
router.use("/auth",authRouter)//loading external routers
router.use("/banner",bannerRouter)
router.use("/brand",brandRouter)
router.use("/category",category)
router.use("/user",userRouter)

module.exports=router
















// router.post("/login",(req,res,next)=>{
//     res.json({//http response that will be sent to the client,json is used to send a JSON reponse
//         result:"Data",
//         msg:"login success",
//         meta:null //object
//     })
// })

// router.get('/aboutus',(req,res,next)=>{
//     res.json({
//         result:"Data",
//         msg:"success or failed",
//         meta:null //object
//     })
// })

// router.get("/register",(req,res,next)=>{
//     res.json({
//         result:null,
//         message:"resgistered data",
//         meta:null
//     })
// })
// router.get("/activate/:token",(req,res,next)=>{
//     const param=req.params
//     res.json({
//         result:null,
//         message:`Your token is ${param.token}`,
//         meta:null
//     })
// })
// router.get("/forget-password",(req,res,next)=>{
//     res.json({
//         result:null,
//         message:"forget password router",
//         meta:null
//     })
// })
// //query string in an url always comes after ?
// //multiple query are separated by &
// //query strings are optional
// //query string does not need to register in router
// router.get("/:catName",(req,res,next)=>{
//     const params=req.params
//     const query=req.query
//     res.json({
//         result:{
//             params:params,
//             query:query//query is an object data
//         }
//     })
// })

// //develop a middleware function to check and pass only if the route is callled by a seller



// router.post("/dashboard",loginCheck,(req,res,next)=>{
    
//     //can only be access after login
//     res.json({
//         result:"I am dashboard",
//         message:"number",
//         meta:null
//     })
// })

// //custom middlewarez
// // const admincheck=(req,res,next)=>{
// //     console.log("i am running")
// //     next()
// // }

// router.post("/admin",loginCheck,checkPermission("admin"),(req,res,next)=>{
    
//     //can only be access after login
//     res.json({

//     })
// })

// // const sellercheck=(req,res,next)=>{
// //     console.log("i am seller")
// //     next()
// // }

// router.post("/seller",loginCheck,checkPermission("seller"),(req,res,next)=>{
//     throw{code:"",message:""}//this will also call the error present in express config because there is no catch anywhere
//     //can only be access after login
//     res.json({

//     })
// })

 
//everything needs to mount on router


 