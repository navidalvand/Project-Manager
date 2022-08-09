const multer = require('multer');
const path = require('path');
const { createPahtDirectory } = require('./functions');

const storage = multer.diskStorage({
    destination : (req , file , callback) => {
        callback(null , createPahtDirectory())
    } ,
    filename : (req , file , callback) => {
        const type = path.extname(file.originalname)
        callback(null , String(Date.now()) + type)
    }
})

const upload_multer = multer({storage})

 
module.exports = {
    upload_multer
}
