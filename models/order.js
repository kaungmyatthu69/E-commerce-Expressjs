const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    items:[{type:Schema.Types.ObjectId,ref:'orderItem'}],
    quantity:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Order',orderSchema);