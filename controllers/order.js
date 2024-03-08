let OrderModel = require('../models/order');
let ProductModel = require('../models/product')
let OrderItemModel = require('../models/orderItem');
let Helper = require('../utils/helper');
const add =async (req,res,next)=>{
    const user = req.user;
    const items = req.body.items;
    let total = 0;
    let saveOrder = new OrderModel();
    let orderItemsObj = [];
    for await (let item of items){
        let product = await ProductModel.findById(item.id);
        let Obj ={
            order:saveOrder._id,
            count:item.count,
            productId:product._id,
            name:product.name,
            price:product.price
        }
        orderItemsObj.push(Obj);
        total += product.price * item.count;

    }

    let orderItemResult = await OrderItemModel.insertMany(orderItemsObj);
    let orderItemId = orderItemResult.map((item)=>item._id);
    saveOrder.user = user._id;
    saveOrder.items = orderItemId;
    saveOrder.quantity = items.length;
    saveOrder.total = total;
    let result = await saveOrder.save();
    Helper.fMsg(res,'Order accepted',result);
}

const getMyOrders= async (req,res,next)=>{
    const user = req.user;
    let orders = await OrderModel.find({user:user._id}).populate('items');
    if(orders){
        Helper.fMsg(res,'Orders',orders);

    }else{
        next(new Error('No orders found'))
    }
}
module.exports = {
    add,
    getMyOrders
}