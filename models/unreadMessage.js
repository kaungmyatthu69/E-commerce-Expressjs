const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const unReadMessageSchema = new Schema({
    from:{type:Schema.Types.ObjectId,ref:'user',required:true},
    to:{type:Schema.Types.ObjectId,ref:'user',required:true},
    created:{type:Date,default:Date.now}
})

module.exports = mongoose.model('unreadMessage',unReadMessageSchema);