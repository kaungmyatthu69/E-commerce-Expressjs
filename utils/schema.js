let Joi = require('joi');

let PermitSchema ={
    add:Joi.object({
        name:Joi.string().required(),
    })
}

let RoleSchema={
    addPermit:Joi.object({
        roleId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        permitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
}

let UserSchema={
    registerUser:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
        phone:Joi.string().required(),
    }),
    loginUser:Joi.object({
        phone:Joi.string().required(),
        password:Joi.string().required(),
    }),
    addRole:Joi.object({
        userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        roleId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    addPermit:Joi.object({
        userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        permitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()

    })

}
let AllSchema={
    id:Joi.object({
        id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
}
module.exports = {
    PermitSchema,
    AllSchema,
    RoleSchema,
    UserSchema,

}