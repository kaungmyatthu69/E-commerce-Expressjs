const PermitModel = require('../models/permit');
const Helper = require('../utils/helper');
const add =async (req,res,next)=>{
    let dbpermit = await PermitModel.findOne({name:req.body.name});
    if(dbpermit){
        return res.status(400).json({message:'Permit already exists'});
    }else {
        let result = await new PermitModel(req.body).save();
        let newPermit = await PermitModel.findById(result._id);
        Helper.fMsg(res,'Permit added successfully',newPermit);
    }
}

const getAll = async (req,res,next)=>{
    let result = await PermitModel.find();
    Helper.fMsg(res,'Permits',result);
}

const getById = async (req,res,next)=>{
    let result = await PermitModel.findById(req.params.id);
    if(result)
    {
        Helper.fMsg(res,'Permit',result);

    }else {
        next(new Error('Cannot found this id permit'));
    }

}

const update=async (req,res,next)=> {
    let permit = await PermitModel.findById(req.params.id);
    if(permit)
    {
        await PermitModel.findByIdAndUpdate(permit._id,req.body);
        let newPermit = await PermitModel.findById(req.params.id);
        Helper.fMsg(res,'Permit updated successfully',newPermit);

    }else {
        next(new Error('Cannot found this id permit'));
    }
}

const drop =async (req,res,next)=>{
    let permit = await PermitModel.findById(req.params.id);
    if(permit)
    {
        await PermitModel.findByIdAndDelete(permit._id);
        Helper.fMsg(res,'Permit deleted successfully',null);
    }else {
        next(new Error('Cannot found this id permit'));
    }

}
module.exports = {
    add,
    getAll,
    getById,
    update,
    drop
}