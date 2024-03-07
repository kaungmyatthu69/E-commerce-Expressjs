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

const paginate = async (req,res,next)=>{
    let pageNumber = Number(req.params.pageNumber);
    const limit = Number(process.env.PAGE_LIMIT);
    const reqPage = pageNumber - 1;
    const skipCount = reqPage * limit;
    let result = await ProductModel.find().skip(skipCount).limit(limit);
    Helper.fMsg(res,'paginate',result);
}

const getById = async (req,res,next)=>{
    let DBProduct = await ProductModel.findById(req.params.id);
    if(DBProduct){
        Helper.fMsg(res,'Get By Id',DBProduct);
    }else {
        next(new Error('No product with this id'));
    }
}


const patch = async (req,res,next)=>{
    let DBProduct = await ProductModel.findById(req.params.id);
    if(DBProduct) {
        await ProductModel.findByIdAndUpdate(DBProduct._id,req.body);
        let result = await ProductModel.findById(req.params.id);
        Helper.fMsg(res,'Successfully updated',result);
    }else {
        next(new Error('No product with this id'));
    }
}

const filter =async (req,res,next)=>{
    let type = req.params.type;
    let pageNumber = Number(req.params.pageNumber);
    const limit = Number(process.env.PAGE_LIMIT);
    const reqPage = pageNumber - 1;
    const skipCount = reqPage * limit;

    let filterType = 'category'
    switch (type){
        case type === 'subcat':
            filterType = 'subCatId';
            break;
        case type === 'childcat':
            filterType = 'childCatId';
            break;
        case type === 'tag':
            filterType = 'tag';
            break;
        case type === 'category':
            filterType = 'category';
            break;
    }
    let TypeObject = {};
    TypeObject[filterType] = req.params.id;

    let result = await ProductModel.find(TypeObject).skip(skipCount).limit(limit);
    Helper.fMsg(res,'filter',result);

}
module.exports = {
    getAll,
    add,
    drop,
    paginate,
    getById,
    patch,
    filter

}