let SubCatModel = require('../models/subCat');
let Helper = require('../utils/helper');
let CategoryModel = require('../models/category')

const all = async (req,res,next)=>{
    let DBSubCat = await SubCatModel.find().populate("childCategories")
    Helper.fMsg(res,'get all sub category',DBSubCat);
}

const add = async (req,res,next)=>{
    let DbSubCat = await SubCatModel.findOne({name:req.body.name});

    if(DbSubCat){
            next(new Error('Subcategory is already exist'));
        }else {
            let DbCat=await CategoryModel.findById(req.body.catId)
            if(DbCat){
                let result = await new SubCatModel(req.body).save();
                await CategoryModel.findByIdAndUpdate(DbCat._id,{$push:{subcats:result._id}})
                Helper.fMsg(res,'Successfully added',result)
            }else {
                next(new Error('No Category with that id'))
            }

    }
}

const drop = async (req,res,next)=>{
    let DbSubCat = await SubCatModel.findById(req.params.id)
    if(DbSubCat){
        await CategoryModel.findByIdAndUpdate(DbSubCat.catId,{$pull:{subcats:DbSubCat._id}})
        await SubCatModel.findByIdAndDelete(DbSubCat._id)
        Helper.fMsg(res,'Successfully dropped')
    }else {
        next(new Error('No Subcat with this id'))
    }
}

const getById = async (req,res,next)=>{
    let DbSubCat = await SubCatModel.findById(req.params.id)
    if(DbSubCat){
        Helper.fMsg(res,'Get BY Id',DbSubCat)
    }else {
        next(new Error('No SubCat with this id'))
    }
}

const patch = async (req,res,next)=>{
    let DbSubCat = await SubCatModel.findById(req.params.id)
    if(DbSubCat){
        await SubCatModel.findByIdAndUpdate(DbSubCat._id,req.body)
        let result = await SubCatModel.findById(req.params.id)
        Helper.fMsg(res,'Successfully updated',result)
    }else {
        next(new Error('No SubCat with this id'));
    }
}
module.exports = {
    all,
    add,
    drop,
    getById,
    patch
}