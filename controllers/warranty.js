const WarrantyModel = require('../models/warranty');
const Helper = require('../utils/helper');
const getAll = async (req,res,next)=>{
    let DBWarranty = await WarrantyModel.find();

    Helper.fMsg(res,'get all child category',DBWarranty);

}

const getById = async (req,res,next)=>{
    let DBWarranty = await WarrantyModel.findById(req.params.id);
    if(DBWarranty){
        Helper.fMsg(res,'Get By Id',DBWarranty);
    }else {
        next(new Error('No warranty with this id'));
    }
}

const add = async (req,res,next)=>{
    let DBWarranty = await WarrantyModel.findOne({name:req.body.name});
    if(DBWarranty) {

        next(new Error('Warranty is already exist'));
    }else {
        req.body.remark = req.body.remark.split(',');
        let result = await new WarrantyModel(req.body).save();
        Helper.fMsg(res,'add warranty',result);
    }
}

let patch = async (req,res,next)=>{
    let DBWarranty = await WarrantyModel.findById(req.params.id);
    if(DBWarranty) {
        req.body.remark = req.body.remark.split(',');
        await WarrantyModel.findByIdAndUpdate(DBWarranty._id, req.body);
        let result = await WarrantyModel.findById(DBWarranty._id);
        Helper.fMsg(res,'Successfully updated',result);
    }else {
        next(new Error('No warranty with this id'));
    }
}

const drop = async (req,res,next)=>{
    let DBWarranty = await WarrantyModel.findById(req.params.id);
    if(DBWarranty) {
        await WarrantyModel.findByIdAndDelete(DBWarranty._id);
        Helper.fMsg(res,'Successfully dropped');
    }else {
        next(new Error('No warranty with this id'));
    }
}

module.exports = {
    getAll,
    getById,
    add,
    patch,
    drop
}