
// subida de archivos
const multer = require('multer');
const shortid = require('shortid');

const configMulter = {
    limits: {fileSize: 1000000},
    storage: fileStorage = multer.diskStorage({
        destination: (req,file, cb) => {
            cb(null, __dirname+'/../uploads')
        },
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        },
        // poner limite de archivos
       /* fileFilter: (req,file,cb) => {
            if(file.mimetype === 'application/pdf') {
                cb(null, true);
            }
        }*/
    }) 
}

exports.subirArchivo = async (req,res) => {
    console.log(req.file);
}
exports.eliminarArchivo = async (req,res) => {}