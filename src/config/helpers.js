    const generateRandomString=(len=100)=>{
    const chars="0123456789_-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const length=chars.length
    let randomStr=""
    for(let i=1; i<=len;i++){
        //length=64=>63
        //Math.random()=>(0,1)*63=>(0,63)
        //ceil==10.001=>11
        //floor==10.001=>10
        const position=Math.ceil(Math.random()*(length-1))//10,15,1
        randomStr+=chars[position]//_d0
    }
   
    return randomStr
}
module.exports={generateRandomString}