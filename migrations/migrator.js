let fs = require('fs');
const Helper = require('../utils/helper');
const UserModel = require('../models/user');

const migrate =()=>{
    let data = fs.readFileSync('./migrations/user.json');
    let users = JSON.parse(data);
    users.forEach(async (user)=>{
        user.password =  Helper.encode(user.password);
        let result = await new UserModel(user).save();
        console.log(result);

    })

}

const backup =async ()=>{
    let users =await UserModel.find();
    fs.writeFileSync('./migrations/backup/users.json',JSON.stringify(users));
    console.log('Backup is done');
}
module.exports = {
    migrate,
    backup
}