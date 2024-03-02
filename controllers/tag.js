const TagModel = require('../models/tag');
const Helper = require('../utils/helper');
const getAll = async (req, res) => {
    let DBTag = await TagModel.find();
    if(DBTag)
    {
        Helper.fMsg(res,'get all tag', DBTag);

    }else {
        next(new Error('No tag available'));
    }
}

const add = async (req,res,next)=>{
    let DBTag = await TagModel.findOne({name:req.body.name});
    if(DBTag){
        next(new Error('Tag is already exist'));
    }else {
        let result = await new TagModel(req.body).save();
        Helper.fMsg(res,'add tag',result);
    }
}

const getById = async(req,res,next)=>{
    let DBTag = await TagModel.findById(req.params.id);
    if(DBTag){
        Helper.fMsg(res,'Get By Id',DBTag);
    }else {
        next(new Error('No Tag with this id'));
    }

}

const drop = async (req,res,next)=>{
    let DBTag = await TagModel.findById(req.params.id);
    if(DBTag){
        await TagModel.findByIdAndDelete(DBTag._id);
        Helper.fMsg(res,'Successfully dropped');
    }else {
        next(new Error('No Tag with this id'));
    }

}
const patch = async (req,res,next)=>{
    let DBTag = await TagModel.findById(req.params.id);
    if(DBTag){
        await TagModel.findByIdAndUpdate(DBTag._id,req.body);
        let result = await TagModel.findById(req.params.id);
        Helper.fMsg(res,'Successfully updated',result);
    }else {
        next(new Error('No Tag with this id'));
    }

}
module.exports = {
    getAll,
    add,
    getById,
    drop,
    patch
}