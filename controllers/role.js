let RoleModel = require('../models/role');
let PermitModel = require('../models/permit');
let Helper = require('../utils/helper');
const add = async (req,res,next)=>{
    let ddRole = await RoleModel.findOne({name:req.body.name});
    if(ddRole) {
        return res.status(400).json({message: 'Role already exists'});
    }else {
        let result= await new RoleModel(req.body).save();
         let newRole = await RoleModel.findById(result._id);
            Helper.fMsg(res,'Role added successfully',newRole);
    }
}

const getAll = async (req,res,next)=>{
    let DBRole = await RoleModel.find().populate('permits','-__v').select('-__v');
    Helper.fMsg(res,'Roles',DBRole);
}


const getById = async (req,res,next)=>{
    let result = await RoleModel.findById(req.params.id);
    if(result)
    {
        Helper.fMsg(res,'Role',result);
    }else {
        next(new Error('Cannot found this id role'));
    }

}

const update = async (req,res,next)=>{
    let role = await RoleModel.findById(req.params.id);
    if(role)
    {
        await RoleModel.findByIdAndUpdate(role._id,req.body);
        let updateRole = await RoleModel.findById(req.params.id);
        Helper.fMsg(res,'Role updated successfully',updateRole);
    }else {
        next(new Error('Cannot found this id role'));

    }
}

const drop = async (req,res,next)=>{
    let role = await RoleModel.findById(req.params.id);
    if(role) {
        await RoleModel.findByIdAndDelete(role._id);
        Helper.fMsg(res, 'Role deleted successfully', null);
    }else {
        next(new Error('Cannot found this id role'));

    }
}

const addPermit= async (req,res,next)=> {
    let role = await RoleModel.findById(req.body.roleId);
    let permit = await PermitModel.findById(req.body.permitId);
    if(role && permit)
    {
        let result = await RoleModel.findByIdAndUpdate(role._id,{$push:{permits:permit._id}});
        let updateRole = await RoleModel.findById(role._id);
        Helper.fMsg(res,'Permit added to role successfully',updateRole);
    }else {
        next(new Error('Cannot found this id role or permit'));
    }

}

const removePermit= async (req,res,next)=> {
    let role = await RoleModel.findById(req.body.roleId);
    let permit = await PermitModel.findById(req.body.permitId);
    if(role && permit) {
        let result = await RoleModel.findByIdAndUpdate(role._id, {$pull: {permits: permit._id}});
        let updateRole = await RoleModel.findById(role._id);
        Helper.fMsg(res, 'Permit removed from role successfully', updateRole);
    }else {
        next(new Error('Cannot found this id role or permit'));
    }
}
module.exports = {
    add,
    getAll,
    getById,
    update,
    drop,
    addPermit,
    removePermit

}