let bcrypt = require('bcryptjs');

const Redis = require('async-redis').createClient();
const jwt = require('jsonwebtoken');

const fMsg= (res,msg="",result=[]) => {
    return res.status(400).json({message:msg,result:result});
}
const encode =(payload)=>bcrypt.hashSync(payload)
const set = async(id,value)=>{
    await Redis.set(id.toString(),JSON.stringify(value));
}
const get = async (id)=>{
    return JSON.parse( await Redis.get(id.toString()))

}

const drop = async (id)=>{
    await Redis.del(id.toString());
}
const comparePassword = (payload,hashed)=>bcrypt.compareSync(payload,hashed)

const makeToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1h'});
}


module.exports = {
    fMsg,
    encode,
    comparePassword,
    set,
    get,
    drop,
    makeToken
}