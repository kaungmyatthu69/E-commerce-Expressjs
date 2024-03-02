const mongoose = require('mongoose');
const {Schema} = mongoose;
const warrantySchema = new Schema({
    name:{type:String, required:true ,unique:true},
    remark:{type:Array},
    image:{type:String,required:true},
    created:{type:Date, default:Date.now}
});

const Warranty = mongoose.model('warranty', warrantySchema);
module.exports = Warranty;
