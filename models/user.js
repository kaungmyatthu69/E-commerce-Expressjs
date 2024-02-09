const mongoose = require('mongoose');
const {Schema} = mongoose;
const userModel = new Schema({
    name:{type:String, required:true },
    email:{type:String, required:true , unique: true },
    password:{type:String, required:true },
    phone:{type:String, required:true },
    role:[{type:Schema.Types.ObjectId, ref:'role', required:true}],
    permits:[{type:Schema.Types.ObjectId, ref:'Permit'}],
    created:{type:Date, default:Date.now}


})

const User = mongoose.model('user', userModel);
module.exports = User;