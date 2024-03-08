require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const ChatHelper = require('./utils/chat')

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const permitRoutes = require('./routes/permit');
const roleRoutes = require('./routes/role');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const subCatRoutes = require('./routes/subcat');
const childCatRoutes = require('./routes/chilCat')
const tagRoutes = require('./routes/tag');
const deliveryRoutes = require('./routes/delivery');
const warrantyRoutes = require('./routes/warranty');
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order');
// const {backup} = require("./migrations/migrator");
const {validateToken, hadAnyRole ,validateRole} = require("./utils/validator");
const jwt = require("jsonwebtoken");
const Helper = require("./utils/helper");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload())

app.use('/permits',permitRoutes);
app.use('/roles',validateToken,validateRole('Owner'),roleRoutes);
app.use('/users',userRoutes);
app.use('/categories',categoryRoutes)
app.use('/subcat',subCatRoutes)
app.use('/childCat',childCatRoutes)
app.use('/tags',tagRoutes)
app.use('/delivery',deliveryRoutes)
app.use('/warranty',warrantyRoutes)
app.use('/products', productRoutes);
app.use('/orders',orderRoutes)
app.use((err,req,res,next)=>{
    err.status = err.status || 200;
    res.status(err.status).json({con:false,msg:err.message })
})

io.of('/chat').use(async (socket,next)=>{
    let token =socket.handshake.query.token;
    if(token) {
        let decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(decoded){
            let user = await Helper.get(decoded._id);
            console.log('user',user)
            if(user){
                socket.userData = user
                next();
            }else {
                next(new Error('User not found'));
            }
        }else {
            next(new Error('Unauthorized'))
        }
    }else {
        next(new Error('Unauthorized'))

    }
}).on('connection',(socket)=>{
    ChatHelper.initializeChat(io,socket)
})

// io.on("connection",(socket)=>{
//     console.log('A user connected');
//     socket.on('test',(data)=>{
//         console.log('Test event',data);
//         socket.emit('success',{"greet":"hello Client"})
//     })
    // socket.on('disconnect',()=>{
    //     console.log('A user disconnected');
    // })
    // socket.on('message',(msg)=>{
    //     console.log('Message:',msg);
    //     io.emit('message',msg);
    // })
// })

const defaultData = async ()=>{
    let migrator = require('./migrations/migrator');
    // await migrator.rpMigrate();
    // await migrator.migrate();
    // await migrator.backup();
    // await migrator.addOwnerRole();
}
// defaultData();
server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})