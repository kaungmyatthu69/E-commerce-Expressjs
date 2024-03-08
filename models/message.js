const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    from:{type:Schema.Types.ObjectId,ref:'user',required:true},
    to:{type:Schema.Types.ObjectId,ref:'user',required:true},
    messageType:{type:String,enum:['text','image'],required:true},
    message:{type:String,required:true},
    created:{type:Date,default:Date.now}
})
module.exports = mongoose.model('message',messageSchema);