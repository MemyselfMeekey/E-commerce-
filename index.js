//making server

const http=require("http")
const app=require('./src/config/express.config')


const httpsServer=http.createServer(app)//server application loader

//0-65535 ports ~ 100 port default ports well known ports
//dont use 21,22,25,80,443,27017,5432,6000 these ports
//ipv4=>127.0.0.1. ipv6=> ::1
httpsServer.listen(3005,'127.0.0.1',(err)=>{
    if(!err){
        console.log("server is running on port")
        console.log("press CTRL+C to disconnect server")
    }
    else{
        console.log(err)
    }
})//(port,host(localhost,127.0.0.1),callback)second and third parameter are optional

