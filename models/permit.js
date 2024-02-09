const mongoose = require('mongoose');
const {Schema} = mongoose;
const permitSchema = new Schema({
    name:{type:String, required:true ,unique:true},

})
const Permit = mongoose.model('Permit', permitSchema);
module.exports = Permit;