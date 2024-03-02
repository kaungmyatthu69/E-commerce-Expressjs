const ProductModel = require('../models/product');
const Helper = require('../utils/helper');
const getAll = async (req, res) => {
    let DBProduct = await ProductModel.find();
    if(DBProduct)
    {
        Helper.fMsg(res,'get all product', DBProduct);

    }else {
        next(new Error('No product available'));
    }
}

const add = async (req,res,next)=>{
    let DBProduct = await  ProductModel.findOne({name:req.body.name})
    if(DBProduct){
        next(new Error('Product is already exits'));
    }else {
        req.body.features = req.body.features.split(',');
        req.body.warranty = req.body.warranty.split(',');
        req.body.delivery = req.body.delivery.split(',');
        req.body.colors= req.body.colors.split(',')
        let result = await new ProductModel(req.body).save();
        Helper.fMsg(res, "Successfully added ", result);

    }
}

const drop = async (req,res,next)=>{
    let DBProduct = await ProductModel.findById(req.params.id);
    if(DBProduct){
        await ProductModel.findByIdAndDelete(DBProduct._id);
        Helper.fMsg(res,'Successfully deleted')
    }else {
        next(new Error('no product with that id '))
    }
}
module.exports = {
    getAll,
    add,
    drop
}