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
let AllSchema={
    id:Joi.object({
        id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
}
module.exports = {
    PermitSchema,
    AllSchema,
    RoleSchema
}