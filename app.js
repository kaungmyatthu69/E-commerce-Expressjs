require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

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
// const {backup} = require("./migrations/migrator");
const {validateToken, hadAnyRole ,validateRole} = require("./utils/validator");

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
app.use('/products/', productRoutes);

app.use((err,req,res,next)=>{
    err.status = err.status || 200;
    res.status(err.status).json({con:false,msg:err.message })
})


const defaultData = async ()=>{
    let migrator = require('./migrations/migrator');
    // await migrator.rpMigrate();
    // await migrator.migrate();
    // await migrator.backup();
    // await migrator.addOwnerRole();
}
// defaultData();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})