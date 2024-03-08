let UserModel = require('../models/user');
let Helper = require('../utils/helper');
let RoleModel = require('../models/role');
let PermitModel = require('../models/permit');
const register =async (req,res,next)=>{
    let dbUserEmail =await  UserModel.findOne({email:req.body.email});
    if(dbUserEmail){
     return (next(new Error('User  emial already exist')));
    }
    let dbUserPhone = await UserModel.findOne({phone:req.body.phone});
    if(dbUserPhone){
        return (next(new Error('User  phone already exist')));
    }

    req.body.password = Helper.encode(req.body.password);
    let user = await new UserModel(req.body).save();
    let newUser = await UserModel.findById(user._id)
    Helper.fMsg(res,'User is created',newUser);


}

const login =async (req,res,next)=>{
    let userPhone = await UserModel.findOne({phone:req.body.phone}).populate('role permits').select("-__v");
    if(userPhone){
        console.log("user",userPhone.password)
        let userPassword= Helper.comparePassword(req.body.password,userPhone.password);
        if(userPassword) {
            let user = userPhone.toObject();

            delete  user.password;
            user.token = Helper.makeToken(user)
            Helper.set(user._id,user);
            Helper.fMsg(res, 'User is logged in', user);
        }else {
            next(new Error('Creditial dsf Error'));
        }
    }else {
        next(new Error('Creditial Error'));
    }
}

const getAllUser = async (req,res,next)=>{
    let users = await UserModel.find().populate('role permits').select("-__v");
    Helper.fMsg(res,'All users',users);

}

const addRole = async (req,res,next)=>{
    let user = await UserModel.findById(req.body.userId);
    let role = await RoleModel.findById(req.body.roleId);
    let foundRole = user.role.find((ro)=>ro.equals(role._id));
    if( !foundRole){
        await UserModel.findByIdAndUpdate(user._id,{$push:{role:role._id}});
        let result = await UserModel.findById(user._id)
        Helper.fMsg(res,'Role is added',result)
    }else {
        next(new Error('User or Role not found'));
    }
}

const removeRole=async(req,res,next)=>{
        let user= await UserModel.findById(req.body.userId);
        let role = await RoleModel.findById(req.body.roleId)
        let foundRole = user.role.find((ro)=>ro.equals(role._id));
        if(foundRole) {
            await  UserModel.findByIdAndUpdate(user._id,{$pull:{role:role._id}});
            let userUpdated = await UserModel.findById(user._id);
            Helper.fMsg(res,'Role is removed',userUpdated)
        }else{
            next(new Error('Role not found'));
        }

}

const addPermit=async(req,res,next)=>{
    let user = await UserModel.findById(req.body.userId);
    let permit = await PermitModel.findById(req.body.permitId);
    let foundPermit = user.permits.find((permit)=>permit.equals(permit._id));
    if(foundPermit){
        next(new Error('Permit already exist'));
    }else{
        await UserModel.findByIdAndUpdate(user._id,{$push:{permits:permit._id}})
        let userUpdated = await UserModel.findById(user._id);
        Helper.fMsg(res,'Permit is added',userUpdated);
    }

}

const removePermit = async (req,res,next)=>{
    let user = await UserModel.findById(req.body.userId);
    let permit = await PermitModel.findById(req.body.permitId);
    let foundPermit = user.permits.find((permit)=>permit.equals(permit._id));
    if(foundPermit){
        await UserModel.findByIdAndUpdate(user._id,{$pull:{permits:permit._id}})
        let userUpdated = await UserModel.findById(user._id);
        Helper.fMsg(res,'Permit is removed',userUpdated);
    }else{
        next(new Error('Permit not found'));

    }
}
module.exports = {
    register,
    login,
    addRole,
    removeRole,
    addPermit,
    removePermit,
    getAllUser
}