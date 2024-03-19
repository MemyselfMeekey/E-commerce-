const {UserModel}=require("../user/user.model")
class UserService{
    transformUpdateData=(existingUser,updateBody)=>{
        const data={...updateBody}
        if(updateBody.image){
            data.image = updateBody.image.filename;
        }
        return data;
    }
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
            const userList=await UserModel.find(filter,{password:0})
        .sort({_id:-1})
        .skip(offset)
        .limit(limit)
        return userList
    }
    catch(exception){
        throw exception
    }
}
    getSingleUser=async(filter)=>{
        try{
            const userDetail=await UserModel.findOne(filter,{password:0})
            return userDetail
        }   
        catch(exception){
            throw exception
        }
    }
}
const userSvc=new UserService()
module.exports=userSvc