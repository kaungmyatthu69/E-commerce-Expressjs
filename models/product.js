const mongoose = require("mongoose");
const {Schema} = mongoose;
const productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    brand: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: "category"},
    subCat: {type: Schema.Types.ObjectId, ref: "subcat"},
    chilCat: {type: Schema.Types.ObjectId, ref: "childcat"},
    warranty: [{type: Schema.Types.ObjectId, ref: "warranty"}],
    price: {type: Number, required: true},
    // stock: {type: Number, required: true},
    tag: {type: Schema.Types.ObjectId, ref: 'tag'},
    features: {type: Array, required: true},
    discount: {type: Number, default: 0},
    description: {type: String, required: true},
    detail: {type: String, required: true},
    // status: {type: Boolean, default: true},
    delivery: [{type: Schema.Types.ObjectId, ref: 'delivery'}],
    colors:{type:Array,required:true},
    size:{type:String,required:true},
    rating: {type: Number, default: 0},
    images: {type: Array, required: true},
    created: {type: Date, default: Date.now},
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;