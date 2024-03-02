const deliveryModel = require('../models/delivery');
const Helper = require('../utils/helper');
const getAll = async (req, res) => {
    let DBDelivery = await deliveryModel.find();
    if(DBDelivery)
    {
        Helper.fMsg(res,'get all delivery', DBDelivery);

    }else {
        next(new Error('No delivery available'));
    }
}
const getById = async(req,res,next)=>{
    let DBDelivery = await deliveryModel.findById(req.params.id);
    if(DBDelivery){
        Helper.fMsg(res,'Get By Id',DBDelivery);
    }else {
        next(new Error('No delivery with this id'));
    }

}

const add = async (req,res,next)=> {
    let DBDelivery = await deliveryModel.findOne({name: req.body.name});
    if (DBDelivery) {
        next(new Error('Delivery is already exist'));
    } else {
        req.body.remark = req.body.remark.split(',');
        let result = await new deliveryModel(req.body).save();
        Helper.fMsg(res, 'add delivery', result);
    }
}

const patch = async (req,res,next)=> {
    let DBDelivery = await deliveryModel.findById(req.params.id);
    if (DBDelivery) {
        await deliveryModel.findByIdAndUpdate(DBDelivery._id, req.body);
        let result = await deliveryModel.findById(req.params.id);
        Helper.fMsg(res, 'Successfully updated', result);
    } else {
        next(new Error('No delivery with this id'));
    }
}
const  drop = async (req,res,next)=> {
    let DBDelivery = await deliveryModel.findById(req.params.id);
    if (DBDelivery) {
        await deliveryModel.findByIdAndDelete(DBDelivery._id);
        Helper.fMsg(res, 'Successfully dropped');
    } else {
        next(new Error('No delivery with this id'));
    }
}

module.exports = {
    getAll,
    getById,
    add,
    patch,
    drop
}
