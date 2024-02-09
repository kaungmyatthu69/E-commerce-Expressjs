require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const permitRoutes = require('./routes/permit');
const roleRoutes = require('./routes/role');
const {backup} = require("./migrations/migrator");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/permits',permitRoutes);
app.use('/roles',roleRoutes);
app.use((err,req,res,next)=>{
    err.status = err.status || 200;
    res.status(err.status).json({con:false,msg:err.message })
})


const defaultData = async ()=>{
    let migrator = require('./migrations/migrator');
    // await migrator.migrate();
    await migrator.backup();
}
defaultData();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})