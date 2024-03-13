//role based access controller
const checkPermission=(role)=>{
   
    return (req,res,next)=>{
        // const user=({role:"admin"})
        const user=req.authUser
        // console.log(role)
        // console.log(user) make a new admin role user and di
        if(
            (typeof role==='string' && role===user.role)
                ||
            (Array.isArray(role)&&role.includes(user.role))
            ){
            next()
        }
        // if(role===user.role){
        //     res.json({
        //         result:null,
        //         messgae:"This is admin",
        //         meta:null
        //     })
        //     console.log("i am permitted for",role)
        //     next()
            
        // }
        else{
            next({code:403, message:"This is an error in check permission"})
            // res.status(403).json({//403==>forbidden
            //     result:null,
            //     message:"This is an error",
            //     meta:null

            // })
        }

    }
}
module.exports=checkPermission