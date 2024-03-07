const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderItemSchema=new Schema({
    order:{type:Schema.Types.ObjectId, ref:'order',required:true},
    count:{type:Number, default: 1},
    productId:{type:Schema.Types.ObjectId, ref:'product',required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:String,enum:['accept','pending','delivered'],required:true , default:'pending'},
    created:{type:Date, default:Date.now}
})
module.exports = mongoose.model('orderItem',orderItemSchema);