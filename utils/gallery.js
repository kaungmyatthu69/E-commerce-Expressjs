let fs = require('fs')
let saveFile =async (req,res,next)=>{
    // console.log(req.files.file)
    if(req.files?.file){
        let file = req.files.file;
        let filename = new Date().valueOf()+"_"+file.name;
        file.mv(`./uploads/${filename}`)
        req.body['image'] = filename;

        next()
    }else {
        next(new Error('file neeed'))
    }

}

let saveFiles =async (req,res,next)=>{
    let files = req.files.files;
    let filenames = [];
    files.forEach(file => {
        let filename = new Date().valueOf()+"_"+file.name;
        file.mv(`./uploads/${filename}`)
        filenames.push(filename)
    });
    req.body['images'] = filenames;
    next()
}

let deleteFile =async (req,res,next)=>{
    let file = req.body.filename
    fs.unlinkSync(`./uploads/${file}`)
    next();
}

module.exports = {
    saveFile,
    saveFiles,
    deleteFile
}