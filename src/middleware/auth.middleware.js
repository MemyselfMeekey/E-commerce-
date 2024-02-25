const loginCheck=((req,res,next)=>{
    //TODO.login check
    let status=false;
    if(status){
        next()
    }
    else{
        // res.status(401).json({
        //     result:null,
        //     message:"Please login ",
        //     meta:null
        // })
        next({code:401, message:"Please login first",detail:""})//next with a parameter is always an error and goes to error
    }
    
})

module.exports=loginCheck
