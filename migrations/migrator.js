let fs = require('fs');
const Helper = require('../utils/helper');
const UserModel = require('../models/user');
const RoleModel = require('../models/role');
const PermitModel = require('../models/permit');

const migrate =()=>{
    let data = fs.readFileSync('./migrations/user.json');
    let users = JSON.parse(data);
    users.forEach(async (user)=>{
        user.password =  Helper.encode(user.password);
        let result = await new UserModel(user).save();
        console.log(result);

    })

}

const rpMigrate =()=>{
    let data = fs.readFileSync('./migrations/rolesPermits.json');
    let rolesPermits = JSON.parse(data);
    rolesPermits.roles.forEach(async (role)=>{
        let result = await new RoleModel(role).save();
        console.log(result);
    })
    rolesPermits.permits.forEach(async (permit)=> {
        let result = await new PermitModel(permit).save();
        console.log(result);
    })
}
const backup =async ()=>{
    let users =await UserModel.find();
    fs.writeFileSync('./migrations/backup/users.json',JSON.stringify(users));
    console.log('Backup is done');
}

const addOwnerRole =async ()=>{
    let user= await  UserModel.findOne({email:"owner@gamil.com"})
    let role = await RoleModel.findOne({name:"Owner"});
    await UserModel.findByIdAndUpdate(user._id,{$push:{role:role._id}});
}
module.exports = {
    migrate,
    backup,
    rpMigrate,
    addOwnerRole
}