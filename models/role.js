const mongoose = require('mongoose');
const {Schema} = mongoose;
const roleSchema = new Schema({
    name:{type:String, required:true ,unique:true},
    permits:[{type:Schema.Types.ObjectId, ref:'Permit'}]
})

const Role = mongoose.model('role', roleSchema);
module.exports = Role;