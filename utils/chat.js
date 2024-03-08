const Helper = require('../utils/helper');
const MessageModel = require('../models/message');
const UnReadMessage = require('../models/unreadMessage');
const liveUser = async (socketId,user)=>{
    user['socketId'] = socketId;
    Helper.set(socketId,user._id);
    Helper.set(user._id,user);
}
const initializeChat = async (io,socket) => {
    socket['currentUserId']= socket.userData._id
    await  liveUser(socket.id,socket.userData);
    socket.on('message',data=>inCommingMessage(io,socket,data))
    socket.on('unread',data => loadUnRead(socket))
    socket.on('loadMore',obj=>loadMore(socket,obj))
}

const loadUnRead = async (socket)=>{
    let unreads= await UnReadMessage.find({to:socket.currentUserId}).populate('from','name _id');
    if(unreads.length>0){
        unreads.forEach(async (unread)=>{
           await UnReadMessage.findByIdAndDelete(unread._id)
        })
    }
    socket.emit("unreads",{msg:unreads.length})
}

const inCommingMessage= async (io,socket,data)=>{
    let message = await new MessageModel(data).save();

    let messageResult = await MessageModel.findById(message._id).populate('from to','name _id')
    let toUser =await Helper.get( messageResult.to._id)
    if(toUser){
        let toUserSocket = io.of('/chat').to(toUser.socketId)
        if(toUserSocket){
            toUserSocket.emit('message',messageResult)
        }else {
            next(new Error('Socket not found'));
        }
    }else {
        await new UnReadMessage({from:messageResult.from._id,to:messageResult.to._id}).save();

    }
    socket.emit('message',messageResult)


}

const loadMore = async (socket,obj)=>{
    let limit = Number(process.env.MESSAGE_LIMIT);
    let pageNumber = Number(obj.page) === 1 ? 0 : Number(obj.page) - 1;
    let SkipCount = pageNumber * limit;
    let messages = await MessageModel.find(
        {
            $or:[
                {from:socket.currentUserId},
                {to:socket.currentUserId}
            ]
        }
    ).sort({created:-1}).skip(SkipCount).limit(limit).populate('from to','name _id');
    socket.emit('messages',messages)
}
module.exports = {
    initializeChat
}