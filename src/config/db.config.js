require ('dotenv').config()
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGODB_URL,{
    dbName:process.env.MONGODB_DB_NAME,
    autoCreate:true,
    autoIndex:true
}).then((res)=>{
    console.log("db is connceted")
})
    .catch((err)=>{
        console.log(err)
        throw{message: "Db server cannot be connected",code:500}
    })