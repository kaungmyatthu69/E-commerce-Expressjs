const {bool} = require("joi");
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

module.exports = {
    validateBody,
    validateParams
}