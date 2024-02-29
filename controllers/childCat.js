const ChildCatModel = require('../models/childCat');
const SubCatModel = require('../models/subCat');
const Helper= require('../utils/helper');
const getAll = async (req, res) => {
    let DBChildCat = await ChildCatModel.find();
    Helper.fMsg(res,'get all child category', DBChildCat);
}

const add = async (req,res,next)=>{
    let DBChilCat = await ChildCatModel.findOne({name:req.body.name});
    if(DBChilCat) {
        next(new Error('Child category is already exist'));
    }else {
        let result = await new ChildCatModel(req.body).save();
        await SubCatModel.findByIdAndUpdate(result.subCatId,{$push:{childCategories: result._id}});
        Helper.fMsg(res,'add child category', result);
    }
}

const drop = async (req,res,next)=>{
    let DbChildCat = await ChildCatModel.findById(req.params.id)
    if(DbChildCat){
        await  SubCatModel.findByIdAndUpdate(DbChildCat.subCatId,{$pull:{childCategories:DbChildCat._id}});
        await ChildCatModel.findByIdAndDelete(req.params.id)
        Helper.fMsg(res,'delete child category');
    }else {
        next(new Error('Child category is not exist'));

    }
}

const patch = async (req,res,next)=>{
    let DbChildCat = await ChildCatModel.findById(req.params.id);
    if(DbChildCat){
        await ChildCatModel.findByIdAndUpdate(DbChildCat._id,req.body);
        let result = await ChildCatModel.findById(DbChildCat._id);
        Helper.fMsg(res,'Successfully updated',result);
    }else {
        next(new Error('Child category is not exist'));
    }
}

const getById= async (req,res,next)=>{
    let DbChildCat = await ChildCatModel.findById(req.params.id);
    if(DbChildCat){
        Helper.fMsg(res,'Get By Id',DbChildCat);
    }else {
        next(new Error('Child category is not exist'));
    }

}

module.exports = {
    getAll,
    add,
    drop,
    patch,
    getById
}