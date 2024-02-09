let bcrypt = require('bcryptjs');
const fMsg= (res,msg="",result=[]) => {
    return res.status(400).json({message:msg,result:result});
}
const encode =(payload)=>bcrypt.hashSync(payload)

module.exports = {
    fMsg,
    encode
}