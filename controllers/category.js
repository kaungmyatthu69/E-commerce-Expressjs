const Helper = require('../utils/helper')
const CateModel = require('../models/category')
const add = async (req,res,next)=>{
    let hasCategory = await CateModel.findOne({name:req.body.name})
    if(hasCategory){
        next(new Error('Category is already in use'))
    }else {
        let result = await new CateModel(req.body).save();
        Helper.fMsg(res,"category save",result)

    }

}

const getAll=async (req,res,next)=>{
    let result = await CateModel.find().populate({
        path:'subcats',
        populate:{
            path:'childCategories',
            model:'childcat'
        }
    });
    Helper.fMsg(res,"get all category",result)
}

const getById = async (req,res,next)=>{
    let result = await CateModel.findById(req.params.id)
    if(result){
        Helper.fMsg(res,'Get By Id', result)
    }else {
        next(new Error('No Category with that id'))
    }
}

const drop = async (req,res,next)=>{
    let result = await CateModel.findById(req.params.id)
    if(result){
        await CateModel.findByIdAndDelete(req.params.id)
        Helper.fMsg(res,'Successfully delected')

    }else {
        next(new Error('No category with that id'))
    }
}

const patch = async (req,res,next)=>{
    let DBCat = await CateModel.findById(req.params.id)
    if(DBCat){
        await CateModel.findByIdAndUpdate(DBCat._id,req.body)
        let result = await CateModel.findById(req.params.id)
        Helper.fMsg(res,'Successfully updated',result)
    }else {
        next(new Error('No Category with that id'))
    }
}
module.exports = {
    add,
    getAll,
    getById,
    drop,
    patch
}