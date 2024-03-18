const {UserModel}=require("../user/user.model")
class UserService{
    getCount=async(filter)=>{
        try{
            return await UserModel.countDocuments(filter)

        }
        catch(exception){
            throw exception
        }
    }
    listUserByfilter=async(filter,offset,limit)=>{
        try{
            const userList=await UserModel.find(filter)
        .sort({_id:-1})
        .skip(offset)
        .limit(limit)
        return userList
    }
    catch(exception){
        throw exception
    }
}
}
const userSvc=new UserService()
module.exports=userSvc