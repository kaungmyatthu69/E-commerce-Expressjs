const jwt = require('jsonwebtoken');
const Helper = require('./helper');
const UserModel = require('../models/user');

const validateBody=(schema)=>{
    return (req,res,next)=>{
        const result = schema.validate(req.body);
        if(result.error){
            return res.status(400).json(result.error.details[0]);
        }
        next();
    }
}

const validateParams=(schema,name)=>{
    return (req,res,next)=>{
        let obj ={}
        obj[name] = req.params[name]
        const result = schema.validate(obj);
        if(result.error){
            return res.status(400).json(result.error.details[0]);
        }
        next();
    }
}


const validateToken=async (req,res,next)=>{
    let token =  req.headers.authorization.split(' ')[1];
    if(token){
       let decoded=jwt.verify(token,process.env.SECRET_KEY)
        console.log(decoded._id)
        let user = await Helper.get(decoded._id);
       if(user){
              req.user = user
              next();
       }else {
           next(new Error('User not found'));
       }
    }else {
        return res.status(400).json({message:'Token is required'});
    }
}

const validateRole=(role)=>{
    return async (req,res,next)=>{
        let foundRole = req.user.role.find((ro)=>ro.name === role);
        if(foundRole)
        {
            next();
        }else {
            return res.status(401).json({message:'You are not allowed to access this route'});
        }


    }
}

const hadAnyRole=(roles)=>{
    return async (req,res,next)=>{
        let bol = false;
        for (let i=0; i < roles.length ; i++){
            let foundRole = req.user.role.find((role)=>role.name === roles[i])
            if(foundRole){
               bol = true;
               break;
            }
        }
        if(bol) next();
        else  next(new Error("You don't have enough role!"))
    }
}
const hasAnyPermits=(permits)=>{
    return async (req,res,next)=>{
        let bol = false;
        for (let i=0; i < permits.length ; i++){
            let foundPermit = req.user.permits.find((permit)=>permit.name === permits[i])
            if(foundPermit){
               bol = true;
               break;
            }
        }
        if(bol) next();
        else  next(new Error("You don't have enough permits!"))
    }
}
module.exports = {
    validateBody,
    validateParams,
    validateToken,
    validateRole,
    hadAnyRole,
    hasAnyPermits
}