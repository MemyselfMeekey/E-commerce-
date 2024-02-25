//role based access control
const checkPermission=(role)=>{
    return (req,res,next)=>{
        // const user=({role:"admin"})
        if(role==="admin"){
            res.json({
                result:null,
                messgae:"This is admin",
                meta:null
            })
            console.log("i am permitted for",role)
            next()
            
        }
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